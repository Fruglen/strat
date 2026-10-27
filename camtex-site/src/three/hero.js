import * as THREE from 'three';
import { makeBlueprint, easeOutCubic, easeInOutCubic, span, clamp01 } from './blueprint.js';

/* ───────────────────────── terrain field ───────────────────────── */

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function vnoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
}
function fbm(x, y) {
  let f = 0;
  let amp = 0.5;
  for (let i = 0; i < 4; i++) {
    f += amp * vnoise(x, y);
    x *= 2.03;
    y *= 2.03;
    amp *= 0.5;
  }
  return f;
}
const smooth = (a, b, t) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};

const ROAD_Y = 20;
const WATER_Y = -6;

export function riverX(z) {
  return 35 * Math.sin(z * 0.0045) + 15 * Math.sin(z * 0.011 + 1.3);
}
export function terrainHeight(x, z) {
  const d = Math.abs(x - riverX(z));
  let h = 14 + fbm(x * 0.0035 + 3.1, z * 0.0035 - 1.7) * 26 * smooth(110, 420, d) + fbm(x * 0.02, z * 0.02) * 1.6;
  h -= 34 * Math.exp(-Math.pow(d / 95, 2));
  // embankment for the approach roads
  const w = smooth(70, 22, Math.abs(z)) * smooth(190, 250, Math.abs(x));
  h = h + (ROAD_Y - 0.6 - h) * w;
  return h;
}

/* ───────────────────────── scene ───────────────────────── */

export function createHeroScene(canvas, { reducedMotion = false, onPhase, onSpan } = {}) {
  const isSmall = window.matchMedia('(max-width: 820px)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !isSmall;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const HORIZON = new THREE.Color('#2b1e17');
  scene.fog = new THREE.Fog(HORIZON, 420, 1700);

  const camera = new THREE.PerspectiveCamera(isSmall ? 52 : 38, 1, 1, 6000);

  const sunDir = new THREE.Vector3(0.78, 0.13, -0.62).normalize();

  /* sky dome */
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(3000, 32, 16),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uSun: { value: sunDir }, uHorizon: { value: HORIZON } },
      vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        uniform vec3 uSun; uniform vec3 uHorizon; varying vec3 vDir;
        void main(){
          float y = clamp(vDir.y, -0.2, 1.0);
          vec3 zenith = vec3(0.025,0.03,0.04);
          vec3 col = mix(uHorizon, zenith, smoothstep(0.0, 0.45, y));
          float sun = max(dot(normalize(vDir), uSun), 0.0);
          col += vec3(1.0,0.42,0.16) * pow(sun, 26.0) * 0.42 * (1.0 - smoothstep(0.0,0.5,y));
          col += vec3(1.0,0.7,0.45) * pow(sun, 900.0) * 1.0;
          // faint high-altitude grid, like vellum
          gl_FragColor = vec4(col, 1.0);
        }`,
    })
  );
  scene.add(sky);

  /* lights */
  const hemi = new THREE.HemisphereLight('#8ea3b8', '#2a1f18', 1.05);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight('#ffb27a', 2.6);
  sun.position.copy(sunDir).multiplyScalar(600);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -380, right: 380, top: 260, bottom: -260, near: 10, far: 1400 });
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#a9c2da', 1.25);
  fill.position.set(-400, 220, 380);
  scene.add(fill);

  /* terrain */
  const TSIZE = 2000;
  const TSEG = isSmall ? 150 : 220;
  const tGeo = new THREE.PlaneGeometry(TSIZE, TSIZE, TSEG, TSEG);
  tGeo.rotateX(-Math.PI / 2);
  const tp = tGeo.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    tp.setY(i, terrainHeight(tp.getX(i), tp.getZ(i)));
  }
  tGeo.computeVertexNormals();

  const terrainUniforms = { uReveal: { value: 0 } };
  const tMat = new THREE.MeshStandardMaterial({ color: '#1f2021', roughness: 1, metalness: 0 });
  tMat.onBeforeCompile = (shader) => {
    shader.uniforms.uReveal = terrainUniforms.uReveal;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nuniform float uReveal;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float hc = vWPos.y / 2.5;
        float minor = 1.0 - min(abs(fract(hc - 0.5) - 0.5) / fwidth(hc), 1.0);
        float hM = vWPos.y / 12.5;
        float major = 1.0 - min(abs(fract(hM - 0.5) - 0.5) / fwidth(hM) * 0.7, 1.0);
        vec2 g = vWPos.xz / 50.0;
        vec2 gf = abs(fract(g - 0.5) - 0.5) / fwidth(g);
        float grid = 1.0 - min(min(gf.x, gf.y), 1.0);
        float dist = length(vWPos.xz);
        float R = uReveal * 1300.0;
        float vis = smoothstep(R, R - 90.0, dist);
        float ring = smoothstep(26.0, 0.0, abs(dist - R)) * step(0.001, uReveal) * (1.0 - step(0.999, uReveal));
        vec3 lc = vec3(0.52, 0.6, 0.66);
        totalEmissiveRadiance += (lc * minor * 0.16 + vec3(0.9,0.55,0.35) * major * 0.32 + lc * grid * 0.06) * vis;
        totalEmissiveRadiance += vec3(1.0, 0.36, 0.12) * ring * 1.6;
        diffuseColor.rgb *= mix(0.08, 1.0, vis);`
      );
  };
  const terrain = new THREE.Mesh(tGeo, tMat);
  terrain.receiveShadow = true;
  scene.add(terrain);

  /* water */
  const waterUniforms = { uTime: { value: 0 }, uSun: { value: sunDir }, uReveal: terrainUniforms.uReveal };
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(TSIZE, TSIZE, 1, 1).rotateX(-Math.PI / 2),
    new THREE.ShaderMaterial({
      fog: true,
      transparent: true,
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {}]),
      vertexShader: `
        #include <fog_pars_vertex>
        varying vec3 vW;
        void main(){
          vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz;
          vec4 mvPosition = viewMatrix * w;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,
      fragmentShader: `
        #include <fog_pars_fragment>
        uniform float uTime; uniform vec3 uSun; uniform float uReveal;
        varying vec3 vW;
        void main(){
          vec3 V = normalize(cameraPosition - vW);
          float fres = pow(1.0 - max(V.y, 0.0), 4.0);
          vec3 deep = vec3(0.03,0.055,0.07);
          vec3 sky = vec3(0.32,0.18,0.12);
          vec3 col = mix(deep, sky, fres);
          float flow = sin(vW.z * 0.06 + uTime * 0.9 + sin(vW.x * 0.08 + uTime * 0.3) * 2.2);
          float streak = smoothstep(0.985, 1.0, flow) * 0.35;
          vec3 H = normalize(V + uSun);
          float glint = pow(max(H.y, 0.0), 260.0) * (0.6 + 0.4 * sin(vW.x * 0.7 + uTime * 2.0));
          col += vec3(1.0,0.55,0.3) * (streak * fres + glint * 1.5);
          float vis = smoothstep(uReveal * 1300.0, uReveal * 1300.0 - 90.0, length(vW.xz));
          gl_FragColor = vec4(col, 0.94 * vis);
          #include <fog_fragment>
        }`,
    })
  );
  water.material.uniforms.uTime = waterUniforms.uTime;
  water.material.uniforms.uSun = waterUniforms.uSun;
  water.material.uniforms.uReveal = waterUniforms.uReveal;
  water.position.y = WATER_Y;
  scene.add(water);

  /* survey points */
  const SP = isSmall ? 500 : 900;
  const spPos = new Float32Array(SP * 3);
  for (let i = 0; i < SP; i++) {
    const r = Math.sqrt(Math.random()) * 650;
    const a = Math.random() * Math.PI * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    spPos[i * 3] = x;
    spPos[i * 3 + 1] = Math.max(terrainHeight(x, z), WATER_Y) + 0.8;
    spPos[i * 3 + 2] = z;
  }
  const spGeo = new THREE.BufferGeometry();
  spGeo.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
  const surveyPts = new THREE.Points(
    spGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uReveal: terrainUniforms.uReveal, uDim: { value: 1 }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `
        uniform float uReveal; uniform float uPR; varying float vA;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          float d = length(position.xz);
          float R = uReveal * 1300.0;
          vA = smoothstep(R, R - 40.0, d);
          float pop = smoothstep(60.0, 0.0, R - d) * 2.0;
          gl_PointSize = (3.0 + pop * 4.0) * uPR * (600.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform float uDim; varying float vA;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float d = max(abs(c.x), abs(c.y));
          float cross = step(abs(c.x), 0.07) + step(abs(c.y), 0.07);
          if (d > 0.5 || cross < 0.5) discard;
          gl_FragColor = vec4(1.0, 0.42, 0.15, vA * uDim);
        }`,
    })
  );
  surveyPts.frustumCulled = false;
  scene.add(surveyPts);

  /* ─────────── bridge ─────────── */
  const bridge = new THREE.Group();
  scene.add(bridge);

  const concrete = new THREE.MeshStandardMaterial({ color: '#b3aea5', roughness: 0.82, metalness: 0.02 });
  const concreteDark = new THREE.MeshStandardMaterial({ color: '#8d8983', roughness: 0.9 });
  const asphalt = new THREE.MeshStandardMaterial({ color: '#25282b', roughness: 0.95 });
  const steel = new THREE.MeshStandardMaterial({ color: '#e5dfd5', roughness: 0.35, metalness: 0.45, emissive: '#3b3631' });

  const builders = []; // { obj, t0, t1, apply(k) }
  const addBuilt = (obj, t0, t1, apply) => builders.push({ obj, t0, t1, apply });

  const PYLON_X = 120;
  const DECK_HALF = 230;
  const DECK_W = 26;
  const DECK_Y = ROAD_Y;
  const SEG = 10;

  // pylons (H-shape) — geometry origin at base so they grow upwards
  const pylonH = 118;
  const legGeo = new THREE.BoxGeometry(5, pylonH, 6).translate(0, pylonH / 2, 0);
  const capGeo = new THREE.BoxGeometry(6, 5, 34);
  const footGeo = new THREE.BoxGeometry(28, 8, 42);
  for (const px of [-PYLON_X, PYLON_X]) {
    const base = Math.min(terrainHeight(px, 0), WATER_Y) - 8;
    const foot = new THREE.Mesh(footGeo, concreteDark);
    foot.position.set(px, base + 2, 0);
    bridge.add(foot);
    addBuilt(foot, 0.0, 0.08, (k) => foot.scale.set(1, Math.max(k, 0.001), 1));
    for (const z of [-15, 15]) {
      const leg = new THREE.Mesh(legGeo, concrete);
      leg.position.set(px, base + 4, z);
      leg.castShadow = true;
      bridge.add(leg);
      addBuilt(leg, 0.04, 0.42, (k) => leg.scale.set(1, Math.max(easeOutCubic(k), 0.001), 1));
    }
    for (const [y, t] of [
      [DECK_Y - 4, 0.18],
      [base + 4 + pylonH - 10, 0.42],
    ]) {
      const cap = new THREE.Mesh(capGeo, concrete);
      cap.position.set(px, y, 0);
      cap.castShadow = true;
      bridge.add(cap);
      addBuilt(cap, t, t + 0.06, (k) => cap.scale.set(1, 1, Math.max(easeOutCubic(k), 0.001)));
    }
  }
  const pylonTop = Math.min(terrainHeight(PYLON_X, 0), WATER_Y) - 8 + 4 + pylonH;

  // back-span piers
  const colGeo = new THREE.CylinderGeometry(1.6, 1.8, 1, 12).translate(0, 0.5, 0);
  const pierCapGeo = new THREE.BoxGeometry(4, 2.4, 24);
  for (const px of [-215, -170, 170, 215]) {
    const gy = terrainHeight(px, 0) - 3;
    const h = DECK_Y - 2.4 - gy;
    for (const z of [-8, 8]) {
      const col = new THREE.Mesh(colGeo, concrete);
      col.position.set(px, gy, z);
      col.scale.y = h;
      col.castShadow = true;
      bridge.add(col);
      addBuilt(col, 0.08, 0.3, (k) => col.scale.set(1, Math.max(h * easeOutCubic(k), 0.001), 1));
    }
    const cap = new THREE.Mesh(pierCapGeo, concrete);
    cap.position.set(px, DECK_Y - 2.6, 0);
    bridge.add(cap);
    addBuilt(cap, 0.28, 0.34, (k) => cap.scale.set(1, Math.max(k, 0.001), 1));
  }

  // deck segments — balanced cantilever out of each pylon, closing at midspan
  const segGeo = new THREE.BoxGeometry(SEG - 0.15, 2.4, DECK_W);
  const topGeo = new THREE.BoxGeometry(SEG - 0.15, 0.3, DECK_W - 3);
  const barrierGeo = new THREE.BoxGeometry(SEG - 0.15, 1.3, 0.6);
  for (let x = -DECK_HALF + SEG / 2; x < DECK_HALF; x += SEG) {
    const px = x < 0 ? -PYLON_X : PYLON_X;
    const d = Math.abs(x - px);
    const t0 = 0.3 + (d / 120) * 0.5;
    const g = new THREE.Group();
    g.position.set(x, DECK_Y, 0);
    const box = new THREE.Mesh(segGeo, concrete);
    box.castShadow = box.receiveShadow = true;
    const top = new THREE.Mesh(topGeo, asphalt);
    top.position.y = 1.3;
    top.userData.noBlueprint = true;
    g.add(box, top);
    for (const z of [-DECK_W / 2 + 0.4, DECK_W / 2 - 0.4]) {
      const b = new THREE.Mesh(barrierGeo, concreteDark);
      b.position.set(0, 1.85, z);
      b.userData.noBlueprint = true;
      g.add(b);
    }
    bridge.add(g);
    addBuilt(g, t0, t0 + 0.06, (k) => {
      const e = easeOutCubic(k);
      g.scale.setScalar(Math.max(e, 0.001));
      g.position.y = DECK_Y + (1 - e) * 10;
    });
  }

  // approach roads
  for (const s of [-1, 1]) {
    const road = new THREE.Mesh(new THREE.BoxGeometry(700, 2.4, DECK_W).translate(s * 350, 0, 0), concreteDark);
    road.position.set(s * DECK_HALF, DECK_Y, 0);
    road.receiveShadow = true;
    const top = new THREE.Mesh(new THREE.BoxGeometry(700, 0.3, DECK_W - 3).translate(s * 350, 0, 0), asphalt);
    top.position.y = 1.3;
    top.userData.noBlueprint = true;
    road.add(top);
    bridge.add(road);
    addBuilt(road, 0.1, 0.3, (k) => road.scale.set(Math.max(easeOutCubic(k), 0.001), 1, 1));
    road.userData.noBlueprint = true;
  }

  // stay cables (instanced)
  const cableGeo = new THREE.CylinderGeometry(0.22, 0.22, 1, 5);
  const cables = [];
  for (const px of [-PYLON_X, PYLON_X]) {
    for (const s of [-1, 1]) {
      for (let i = 1; i <= 11; i++) {
        for (const z of [-1, 1]) {
          const a = new THREE.Vector3(px + s * 1.2, pylonTop - 52 + i * 4, z * 15);
          const b = new THREE.Vector3(px + s * i * 9.6, DECK_Y + 1.2, z * (DECK_W / 2 - 0.8));
          const d = Math.abs(b.x - px);
          const t0 = 0.3 + (d / 120) * 0.5 + 0.04;
          cables.push({ a, b, t0 });
        }
      }
    }
  }
  const cableMesh = new THREE.InstancedMesh(cableGeo, steel, cables.length);
  cableMesh.castShadow = true;
  bridge.add(cableMesh);
  const _m = new THREE.Matrix4();
  const _q = new THREE.Quaternion();
  const _up = new THREE.Vector3(0, 1, 0);
  const _dir = new THREE.Vector3();
  const _mid = new THREE.Vector3();
  const _s = new THREE.Vector3();
  function setCable(i, k) {
    const c = cables[i];
    _dir.subVectors(c.b, c.a);
    const len = _dir.length();
    _dir.normalize();
    _q.setFromUnitVectors(_up, _dir);
    const L = len * Math.max(k, 0.0001);
    _mid.copy(c.a).addScaledVector(_dir, L / 2);
    _s.set(k > 0 ? 1 : 0.0001, L, k > 0 ? 1 : 0.0001);
    _m.compose(_mid, _q, _s);
    cableMesh.setMatrixAt(i, _m);
  }
  cables.forEach((_, i) => setCable(i, 1));

  // lamp posts + glows
  const lampPositions = [];
  const poleGeo = new THREE.CylinderGeometry(0.18, 0.25, 9, 6).translate(0, 4.5, 0);
  const poles = new THREE.InstancedMesh(poleGeo, concreteDark, 64);
  let pi = 0;
  for (let x = -DECK_HALF + 15; x < DECK_HALF && pi < 64; x += 30) {
    for (const z of [-DECK_W / 2 + 0.6, DECK_W / 2 - 0.6]) {
      _m.makeTranslation(x, DECK_Y + 1.2, z);
      poles.setMatrixAt(pi++, _m);
      lampPositions.push(x, DECK_Y + 10.4, z * 0.86);
    }
  }
  poles.count = pi;
  poles.userData.noBlueprint = true;
  bridge.add(poles);

  const glowGeo = new THREE.BufferGeometry();
  glowGeo.setAttribute('position', new THREE.Float32BufferAttribute(lampPositions, 3));
  const glowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uOn: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uColor: { value: new THREE.Color('#ffc58a') }, uSize: { value: 26 } },
    vertexShader: `uniform float uPR; uniform float uSize; void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_PointSize = uSize * uPR * (300.0 / -mv.z); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform float uOn; uniform vec3 uColor; void main(){ float d = length(gl_PointCoord-0.5); float a = exp(-d*d*28.0) + smoothstep(0.08,0.0,d); gl_FragColor = vec4(uColor, a*uOn); }`,
  });
  const glows = new THREE.Points(glowGeo, glowMat);
  glows.frustumCulled = false;
  bridge.add(glows);

  // traffic
  const CARS = isSmall ? 26 : 44;
  const cars = [];
  const lanes = [
    { z: -9.5, dir: 1 },
    { z: -3.6, dir: 1 },
    { z: 3.6, dir: -1 },
    { z: 9.5, dir: -1 },
  ];
  for (let i = 0; i < CARS; i++) {
    const lane = lanes[i % 4];
    cars.push({ x: Math.random() * 1800 - 900, z: lane.z, dir: lane.dir, v: 22 + Math.random() * 14 });
  }
  const carBody = new THREE.InstancedMesh(new THREE.BoxGeometry(4.6, 1.5, 2.1), new THREE.MeshStandardMaterial({ color: '#14171a', roughness: 0.4, metalness: 0.5 }), CARS);
  carBody.userData.noBlueprint = true;
  carBody.visible = false;
  scene.add(carBody);
  const carLightPos = new Float32Array(CARS * 2 * 3);
  const carLightCol = new Float32Array(CARS * 2 * 3);
  const head = new THREE.Color('#fff1d6');
  const tail = new THREE.Color('#ff3b1f');
  const carLightGeo = new THREE.BufferGeometry();
  carLightGeo.setAttribute('position', new THREE.BufferAttribute(carLightPos, 3));
  carLightGeo.setAttribute('color', new THREE.BufferAttribute(carLightCol, 3));
  // Camera mostly looks from -x toward +x: cars heading +x show tail lights, -x show headlights.
  cars.forEach((c, i) => {
    const col = c.dir > 0 ? tail : head;
    for (let j = 0; j < 2; j++) col.toArray(carLightCol, (i * 2 + j) * 3);
  });
  const carLights = new THREE.Points(
    carLightGeo,
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { uOn: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
      vertexShader: `uniform float uPR; varying vec3 vC; void main(){ vC = color; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_PointSize = 9.0*uPR*(300.0 / -mv.z); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform float uOn; varying vec3 vC; void main(){ float d = length(gl_PointCoord-0.5); float a = exp(-d*d*30.0); gl_FragColor = vec4(vC, a*uOn); }`,
    })
  );
  carLights.frustumCulled = false;
  scene.add(carLights);

  // lane markings
  const dashGeo = new THREE.BoxGeometry(3.2, 0.06, 0.28);
  const dashes = [];
  for (let x = -900; x < 900; x += 9) {
    dashes.push([x, -6.5], [x, 6.5]);
  }
  const dashMesh = new THREE.InstancedMesh(dashGeo, new THREE.MeshBasicMaterial({ color: '#d8d2c6' }), dashes.length + 2);
  dashes.forEach(([x, z], i) => {
    _m.makeTranslation(x, DECK_Y + 1.48, z);
    dashMesh.setMatrixAt(i, _m);
  });
  const lineGeo = new THREE.BoxGeometry(1800, 0.06, 0.22);
  const centerA = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: '#e0a526' }));
  centerA.position.set(0, DECK_Y + 1.48, -0.3);
  const centerB = centerA.clone();
  centerB.position.z = 0.3;
  dashMesh.count = dashes.length;
  const markings = new THREE.Group();
  markings.add(dashMesh, centerA, centerB);
  markings.visible = false;
  scene.add(markings);

  /* blueprint overlay — built before anything is scaled */
  const blueprint = makeBlueprint(bridge, { color: '#ff5b1f', threshold: 25, axis: 'y' });
  scene.add(blueprint);

  /* ─────────── timeline state ─────────── */
  const state = {
    reveal: 0,
    wire: 0,
    wireFade: 1,
    build: 0,
    lights: 0,
    camIntro: 0,
    scroll: 0,
    scrollTarget: 0,
    mouse: new THREE.Vector2(),
    mouseS: new THREE.Vector2(),
  };

  function applyBuild(p) {
    for (const b of builders) b.apply(span(p, b.t0, b.t1));
    cables.forEach((c, i) => setCable(i, easeOutCubic(span(p, c.t0, c.t0 + 0.07))));
    cableMesh.instanceMatrix.needsUpdate = true;
  }

  /* camera rig */
  const aerialPos = new THREE.Vector3(30, 760, 160);
  const aerialTgt = new THREE.Vector3(0, 0, 0);
  const posCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-370, 64, 300),
      new THREE.Vector3(-180, 30, 120),
      new THREE.Vector3(-20, 13, 46),
      new THREE.Vector3(150, 60, 160),
      new THREE.Vector3(300, 300, 470),
    ],
    false,
    'centripetal'
  );
  const tgtCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(40, 30, -10),
      new THREE.Vector3(60, 52, -10),
      new THREE.Vector3(160, 62, -30),
      new THREE.Vector3(60, 40, -20),
      new THREE.Vector3(0, 20, 0),
    ],
    false,
    'centripetal'
  );
  if (isSmall) {
    posCurve.points[0].set(-380, 90, 330);
  }
  const camPos = new THREE.Vector3();
  const camTgt = new THREE.Vector3();
  const _p = new THREE.Vector3();
  const _t = new THREE.Vector3();

  function updateCamera() {
    const s = state.scroll;
    posCurve.getPoint(s, _p);
    tgtCurve.getPoint(s, _t);
    const k = easeInOutCubic(state.camIntro);
    camPos.lerpVectors(aerialPos, _p, k);
    camTgt.lerpVectors(aerialTgt, _t, k);
    // parallax
    camPos.x += state.mouseS.x * 14 * k;
    camPos.y += state.mouseS.y * 7 * k;
    camera.position.copy(camPos);
    camera.lookAt(camTgt);
    applyViewOffset();
  }

  /* resize */
  let vw = 1;
  let vh = 1;
  function resize() {
    vw = canvas.clientWidth;
    vh = canvas.clientHeight;
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
  }
  // Shift the frame so the structure sits right of the headline on wide screens.
  function applyViewOffset() {
    const k = 1 - span(state.scroll, 0, 0.35);
    // wide: push right of the headline; narrow: lift into the top half above the copy
    const sx = vw > 900 ? 0.17 * k : 0;
    const sy = vw > 900 ? -0.04 * k : 0.2 * k;
    if (Math.abs(sx) + Math.abs(sy) > 0.001) camera.setViewOffset(vw, vh, -vw * sx, vh * sy, vw, vh);
    else camera.clearViewOffset();
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', (e) => {
    state.mouse.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  });

  /* phase / readouts */
  let lastPhase = '';
  let lastSpan = -1;
  function readouts() {
    const phase =
      state.build >= 0.995 && state.lights > 0.5
        ? '04 · OPERATE'
        : state.build > 0.02
          ? '03 · CONSTRUCT'
          : state.wire > 0.05
            ? '02 · DESIGN'
            : '01 · SURVEY';
    if (phase !== lastPhase) {
      lastPhase = phase;
      onPhase?.(phase);
    }
    const spanM = Math.round(Math.min(240, Math.max(0, (state.build - 0.3) / 0.5) * 240) * 10) / 10;
    const v = state.build >= 1 ? 240 : spanM;
    if (v !== lastSpan) {
      lastSpan = v;
      onSpan?.(v);
    }
  }

  /* loop */
  const clock = new THREE.Clock();
  let running = true;
  let visible = true;
  let introStart = -1;
  const INTRO = 6.4;

  function intro(t) {
    state.reveal = easeOutCubic(span(t, 0, 2.2));
    state.wire = span(t, 0.9, 3.3) * 1.02;
    state.build = span(t, 2.3, 5.5);
    state.camIntro = span(t, 0.5, 5.9);
    state.wireFade = 1 - span(t, 4.6, 6.2) * 0.86;
    state.lights = span(t, 5.0, 6.2);
  }

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;

    if (introStart >= 0) intro(time - introStart);

    state.scroll += (state.scrollTarget - state.scroll) * Math.min(1, dt * 4);
    state.mouseS.lerp(state.mouse, Math.min(1, dt * 2.5));

    terrainUniforms.uReveal.value = state.reveal;
    waterUniforms.uTime.value = time;
    surveyPts.material.uniforms.uDim.value = 1 - span(state.build, 0, 0.6) * 0.75;
    blueprint.material.uniforms.uProgress.value = state.wire;
    blueprint.material.uniforms.uFade.value = state.wireFade;
    applyBuild(state.build);

    glowMat.uniforms.uOn.value = state.lights;
    const on = state.lights;
    carLights.material.uniforms.uOn.value = on;
    carBody.visible = markings.visible = on > 0.01;

    if (on > 0.01) {
      cars.forEach((c, i) => {
        c.x += c.dir * c.v * dt;
        if (c.x > 900) c.x = -900;
        if (c.x < -900) c.x = 900;
        const y = DECK_Y + 2.2;
        _m.makeTranslation(c.x, y, c.z);
        carBody.setMatrixAt(i, _m);
        // two lamps per car, at the end facing the camera side
        const end = c.dir > 0 ? -2.3 : 2.3;
        carLightPos.set([c.x + end, y + 0.1, c.z - 0.7], i * 6);
        carLightPos.set([c.x + end, y + 0.1, c.z + 0.7], i * 6 + 3);
      });
      carBody.instanceMatrix.needsUpdate = true;
      carLightGeo.attributes.position.needsUpdate = true;
    }

    readouts();
    updateCamera();
    renderer.render(scene, camera);
  }

  // initial state
  applyBuild(0);
  updateCamera();
  frame();

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
  io.observe(canvas);

  return {
    startIntro() {
      if (reducedMotion) {
        Object.assign(state, { reveal: 1, wire: 1.02, build: 1, camIntro: 1, wireFade: 0.14, lights: 1 });
        return;
      }
      introStart = clock.elapsedTime;
    },
    setScroll(s) {
      state.scrollTarget = s;
      if (reducedMotion) state.scroll = s;
    },
    get introDuration() {
      return INTRO;
    },
    dispose() {
      running = false;
      io.disconnect();
      renderer.dispose();
    },
  };
}
