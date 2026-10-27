import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeBlueprint, easeInOutCubic, span } from './blueprint.js';

export const MODELS = [
  {
    name: 'Bridge',
    desc: 'Multi-span girder bridge over a drainage channel — layout, structural design, hydraulics and inspection.',
    specs: [
      ['Discipline', 'Structural · Hydraulic'],
      ['Scope', 'Layout, design, load rating'],
      ['TxDOT', 'Bridge layouts · Inspection'],
    ],
  },
  {
    name: 'Interchange',
    desc: 'Diamond interchange with an overpass and ramps — route study through roadway and traffic design.',
    specs: [
      ['Discipline', 'Traffic & Transportation'],
      ['Scope', 'Route study, geometric design'],
      ['TxDOT', 'Roadway & highway design'],
    ],
  },
  {
    name: 'Stadium',
    desc: 'Field, eight-lane track, grandstand and lighting — site, drainage and athletic facility design.',
    specs: [
      ['Discipline', 'Athletic Facility Design'],
      ['Scope', 'Site, grading, drainage, lighting'],
      ['Clients', 'School districts, cities'],
    ],
  },
  {
    name: 'Subdivision',
    desc: 'Residential subdivision with streets, lots, detention pond and park — from plat to utilities.',
    specs: [
      ['Discipline', 'Land Development · Landscape'],
      ['Scope', 'Platting, paving, drainage'],
      ['Clients', 'Developers, municipalities'],
    ],
  },
  {
    name: 'Steel Frame',
    desc: 'Six-storey braced steel frame under construction — structural design and construction-phase inspection.',
    specs: [
      ['Discipline', 'Structural · CEI'],
      ['Scope', 'Framing, connections, inspection'],
      ['Phase', 'Construction'],
    ],
  },
];

export function createModelRoom(canvas, { reducedMotion = false, onChange } = {}) {
  const isSmall = window.matchMedia('(max-width: 820px)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.localClippingEnabled = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 800);
  camera.position.set(70, 52, 82);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = 1.38;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.55;
  controls.target.set(0, 6, 0);

  scene.add(new THREE.HemisphereLight('#c9d6e2', '#1d1a17', 1.1));
  const key = new THREE.DirectionalLight('#ffe2c4', 2.4);
  key.position.set(40, 80, 30);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60, near: 1, far: 220 });
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#ff8a55', 1.2);
  rim.position.set(-50, 20, -60);
  scene.add(rim);

  // drafting table: ground disc with grid + shadow catcher
  const grid = new THREE.GridHelper(140, 56, '#3a3f44', '#24282c');
  grid.material.transparent = true;
  grid.material.opacity = 0.55;
  scene.add(grid);
  const shadowCatcher = new THREE.Mesh(new THREE.CircleGeometry(80, 48).rotateX(-Math.PI / 2), new THREE.ShadowMaterial({ opacity: 0.35 }));
  shadowCatcher.receiveShadow = true;
  shadowCatcher.position.y = 0.01;
  scene.add(shadowCatcher);
  const ring = new THREE.Mesh(new THREE.RingGeometry(52, 52.25, 128).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ff5b1f', transparent: true, opacity: 0.6 }));
  ring.position.y = 0.02;
  scene.add(ring);
  const ticks = new THREE.Group();
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const len = i % 6 === 0 ? 3 : 1.2;
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * 52.5, 0.02, Math.sin(a) * 52.5),
      new THREE.Vector3(Math.cos(a) * (52.5 + len), 0.02, Math.sin(a) * (52.5 + len)),
    ]);
    ticks.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: '#7a7f84' })));
  }
  scene.add(ticks);

  // shared clipping plane: reveals solids bottom-up
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.05, clippingPlanes: [clip], ...o });
  const M = {
    concrete: mat('#c8c2b8'),
    concreteDark: mat('#9b968e'),
    asphalt: mat('#33363a', { roughness: 0.95 }),
    steel: mat('#7d8a96', { metalness: 0.6, roughness: 0.45 }),
    accent: mat('#ff5b1f', { roughness: 0.6 }),
    grass: mat('#4d6a43'),
    grassDark: mat('#40593a'),
    track: mat('#b0532f'),
    water: mat('#2f5568', { roughness: 0.15, metalness: 0.2 }),
    white: mat('#ece8df'),
    roof: mat('#5b4a3f'),
    tree: mat('#56744a'),
    glass: mat('#8fb0c4', { metalness: 0.3, roughness: 0.2 }),
  };

  const box = (g, w, h, d, x, y, z, m, ry = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    mesh.position.set(x, y, z);
    mesh.rotation.y = ry;
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };
  const cyl = (g, r, h, x, y, z, m, seg = 12) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };
  /** box spanning two points (beams, braces, ramps) */
  const strut = (g, a, b, w, h, m) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, len), m);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.lookAt(b);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };
  const tree = (g, x, z, s = 1) => {
    cyl(g, 0.25 * s, 2 * s, x, s, z, M.concreteDark, 6).userData.noBlueprint = true;
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7 * s, 0), M.tree);
    c.position.set(x, 3 * s, z);
    c.castShadow = true;
    g.add(c);
  };

  /* ── builders ── */
  const animated = []; // per-model tick functions

  function buildBridge() {
    const g = new THREE.Group();
    // channel banks
    box(g, 22, 4, 60, -27, 2, 0, M.grass);
    box(g, 22, 4, 60, 27, 2, 0, M.grass);
    box(g, 32, 0.6, 60, 0, 0.3, 0, M.water).userData.noBlueprint = true;
    // slopes
    for (const s of [-1, 1]) {
      const slope = box(g, 6, 0.6, 60, s * 13.5, 2, 0, M.concreteDark);
      slope.rotation.z = s * 0.55;
    }
    // abutments + piers
    for (const x of [-26, 26]) box(g, 3, 5, 14, x, 5.5, 0, M.concreteDark);
    for (const x of [-9, 9]) {
      for (const z of [-4, 0, 4]) cyl(g, 0.7, 7.2, x, 3.6, z, M.concrete);
      box(g, 2.2, 1.4, 13, x, 7.6, 0, M.concrete);
    }
    // girders + deck + barriers
    for (const z of [-4.5, -1.5, 1.5, 4.5]) box(g, 54, 1.4, 1, 0, 9, z, M.concrete);
    box(g, 56, 0.8, 13, 0, 10.1, 0, M.concrete);
    box(g, 56, 0.12, 11, 0, 10.56, 0, M.asphalt).userData.noBlueprint = true;
    for (const z of [-6.2, 6.2]) box(g, 56, 1.1, 0.5, 0, 11.1, z, M.white);
    // approach roads
    for (const s of [-1, 1]) box(g, 16, 0.4, 11, s * 46, 4.2, 0, M.asphalt);
    // dashed centerline
    for (let x = -26; x <= 26; x += 4) box(g, 2, 0.05, 0.25, x, 10.65, 0, M.white).userData.noBlueprint = true;
    return g;
  }

  function buildInterchange() {
    const g = new THREE.Group();
    // highway (two carriageways along x)
    for (const z of [-6, 6]) box(g, 110, 0.5, 10, 0, 0.25, z, M.asphalt);
    box(g, 110, 0.9, 0.6, 0, 0.45, 0, M.white);
    for (const z of [-6, 6]) for (let x = -52; x < 54; x += 6) box(g, 2.6, 0.05, 0.25, x, 0.52, z, M.white).userData.noBlueprint = true;
    // overpass along z
    box(g, 12, 1.2, 70, 0, 8, 0, M.concrete);
    box(g, 11, 0.1, 70, 0, 8.65, 0, M.asphalt).userData.noBlueprint = true;
    for (const x of [-6.2, 6.2]) box(g, 0.4, 1, 70, x, 9.1, 0, M.white);
    for (const x of [-3, 3]) cyl(g, 0.8, 7.4, x, 3.7, 0, M.concrete);
    for (const z of [-13, 13]) box(g, 12, 7.4, 2, 0, 3.7, z, M.concreteDark);
    // ramps: from highway level (x=±48) up to the overpass (x=±6) on each side
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const a = new THREE.Vector3(sx * 50, 0.5, sz * 15);
        const b = new THREE.Vector3(sx * 9, 8, sz * 22);
        strut(g, a, b, 6, 0.8, M.asphalt);
        strut(g, a.clone().setY(-1.2), b.clone().setY(6.3), 6.4, 2.6, M.concreteDark).userData.noBlueprint = true;
      }
    }
    // signal mast arms + light poles
    for (const sx of [-1, 1]) {
      cyl(g, 0.25, 9, sx * 30, 4.5, -13, M.steel, 6);
      box(g, 0.3, 0.3, 8, sx * 30, 9, -9, M.steel);
    }
    // cars
    const cars = [];
    const carColors = [M.accent, M.white, M.steel, M.concreteDark];
    for (let i = 0; i < 10; i++) {
      const lane = i % 4;
      const z = [-8.5, -3.5, 3.5, 8.5][lane];
      const c = box(g, 3.8, 1.4, 1.8, -50 + Math.random() * 100, 1.2, z, carColors[i % 4]);
      c.userData.noBlueprint = true;
      c.userData.dir = lane < 2 ? 1 : -1;
      c.userData.v = 10 + Math.random() * 6;
      cars.push(c);
    }
    animated[1] = (dt) => {
      for (const c of cars) {
        c.position.x += c.userData.dir * c.userData.v * dt;
        if (c.position.x > 54) c.position.x = -54;
        if (c.position.x < -54) c.position.x = 54;
      }
    };
    return g;
  }

  function buildStadium() {
    const g = new THREE.Group();
    // track: stadium shape with hole
    const outer = new THREE.Shape();
    const R1 = 19;
    const L = 22;
    outer.absarc(L, 0, R1, -Math.PI / 2, Math.PI / 2, false);
    outer.absarc(-L, 0, R1, Math.PI / 2, (3 * Math.PI) / 2, false);
    const inner = new THREE.Path();
    const R2 = 13;
    inner.absarc(L, 0, R2, -Math.PI / 2, Math.PI / 2, false);
    inner.absarc(-L, 0, R2, Math.PI / 2, (3 * Math.PI) / 2, false);
    outer.holes.push(inner);
    const trackGeo = new THREE.ExtrudeGeometry(outer, { depth: 0.4, bevelEnabled: false, curveSegments: 32 });
    trackGeo.rotateX(-Math.PI / 2);
    const track = new THREE.Mesh(trackGeo, M.track);
    track.receiveShadow = true;
    g.add(track);
    // lane lines
    for (let r = R2 + 0.75; r < R1; r += 0.75) {
      const shape = new THREE.Shape();
      shape.absarc(L, 0, r + 0.06, -Math.PI / 2, Math.PI / 2, false);
      shape.absarc(-L, 0, r + 0.06, Math.PI / 2, (3 * Math.PI) / 2, false);
      const hole = new THREE.Path();
      hole.absarc(L, 0, r - 0.06, -Math.PI / 2, Math.PI / 2, false);
      hole.absarc(-L, 0, r - 0.06, Math.PI / 2, (3 * Math.PI) / 2, false);
      shape.holes.push(hole);
      const lg = new THREE.ShapeGeometry(shape, 32).rotateX(-Math.PI / 2);
      const lm = new THREE.Mesh(lg, M.white);
      lm.position.y = 0.42;
      lm.userData.noBlueprint = true;
      g.add(lm);
    }
    // field with mowing stripes
    for (let i = 0; i < 10; i++) {
      box(g, 5.4, 0.3, 24, -24.3 + i * 5.4, 0.2, 0, i % 2 ? M.grass : M.grassDark).userData.noBlueprint = i % 3 !== 0;
    }
    for (const x of [-27, 27]) {
      box(g, 0.3, 6, 0.3, x, 3, -2.8, M.white).userData.noBlueprint = true;
      box(g, 0.3, 6, 0.3, x, 3, 2.8, M.white).userData.noBlueprint = true;
      box(g, 0.3, 0.3, 5.6, x, 2, 0, M.white);
    }
    // grandstand (stepped) + press box
    for (let i = 0; i < 8; i++) box(g, 50, 1, 2, 0, 0.5 + i * 1, -22 - i * 1.6, M.concrete);
    box(g, 50, 9, 1, 0, 4.5, -34.5, M.concreteDark);
    box(g, 22, 3.6, 4, 0, 10.6, -33, M.glass);
    box(g, 24, 0.6, 5.4, 0, 12.7, -33, M.accent);
    // visitor stands
    for (let i = 0; i < 4; i++) box(g, 34, 1, 2, 0, 0.5 + i, 22 + i * 1.6, M.concrete);
    // light towers
    for (const [x, z] of [
      [-34, -22],
      [34, -22],
      [-34, 22],
      [34, 22],
    ]) {
      cyl(g, 0.45, 22, x, 11, z, M.steel, 8);
      box(g, 5, 2.6, 0.8, x, 22.5, z, M.white);
    }
    // scoreboard
    box(g, 0.6, 3, 0.6, 46, 1.5, -3, M.steel);
    box(g, 0.6, 3, 0.6, 46, 1.5, 3, M.steel);
    box(g, 1, 5, 10, 46, 5.5, 0, M.asphalt);
    return g;
  }

  function buildSubdivision() {
    const g = new THREE.Group();
    box(g, 100, 0.6, 80, 0, 0.3, 0, M.grassDark).userData.noBlueprint = true;
    // collector road + loop streets
    box(g, 100, 0.25, 7, 0, 0.72, -30, M.asphalt);
    box(g, 6, 0.25, 54, -28, 0.72, 2, M.asphalt);
    box(g, 6, 0.25, 54, 28, 0.72, 2, M.asphalt);
    box(g, 62, 0.25, 6, 0, 0.72, 26, M.asphalt);
    box(g, 62, 0.25, 6, 0, 0.72, -4, M.asphalt);
    // lots + houses
    const roofShape = new THREE.Shape([new THREE.Vector2(-3.2, 0), new THREE.Vector2(3.2, 0), new THREE.Vector2(0, 2.4)]);
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 7, bevelEnabled: false });
    roofGeo.translate(0, 0, -3.5);
    const addHouse = (x, z, flip) => {
      box(g, 6, 3.2, 7, x, 2.2, z, M.white);
      const r = new THREE.Mesh(roofGeo, M.roof);
      r.position.set(x, 3.8, z);
      r.castShadow = true;
      g.add(r);
      box(g, 1.6, 0.1, 3.5, x + 1.6, 0.66, z + flip * 4.8, M.concrete).userData.noBlueprint = true;
    };
    for (let i = 0; i < 6; i++) {
      const x = -20 + i * 8;
      addHouse(x, -12, 1);
      addHouse(x, 4.5, -1);
      addHouse(x, 17, 1);
    }
    // detention pond + park
    const pond = new THREE.Mesh(new THREE.CylinderGeometry(9, 7, 0.8, 32), M.water);
    pond.scale.z = 0.6;
    pond.position.set(-38, 0.35, -16);
    g.add(pond);
    box(g, 10, 0.4, 10, 41, 0.7, -14, M.grass);
    box(g, 5, 0.3, 5, 41, 3.4, -14, M.accent);
    for (const [x, z] of [
      [39, -12],
      [43, -16],
      [39, -16],
      [43, -12],
    ])
      cyl(g, 0.2, 2.6, x, 2, z, M.steel, 6);
    for (let i = 0; i < 22; i++) {
      const x = -46 + Math.random() * 92;
      const z = 32 + Math.random() * 6;
      tree(g, x, z, 0.8 + Math.random() * 0.4);
    }
    for (let i = 0; i < 10; i++) tree(g, 34 + Math.random() * 14, -2 + Math.random() * 26, 0.9);
    return g;
  }

  function buildFrame() {
    const g = new THREE.Group();
    const BX = 4;
    const BZ = 3;
    const W = 8;
    const H = 4.2;
    const FLOORS = 6;
    const x0 = -((BX * W) / 2) - 6;
    const z0 = -((BZ * W) / 2);
    box(g, BX * W + 4, 1, BZ * W + 4, x0 + (BX * W) / 2, 0.5, 0, M.concreteDark);
    for (let f = 0; f < FLOORS; f++) {
      const y = 1 + f * H;
      for (let i = 0; i <= BX; i++) for (let j = 0; j <= BZ; j++) box(g, 0.5, H, 0.5, x0 + i * W, y + H / 2, z0 + j * W, M.steel);
      for (let i = 0; i <= BX; i++) box(g, 0.35, 0.55, BZ * W, x0 + i * W, y + H, 0, M.steel);
      for (let j = 0; j <= BZ; j++) box(g, BX * W, 0.55, 0.35, x0 + (BX * W) / 2, y + H, z0 + j * W, M.steel);
      if (f < 4) box(g, BX * W, 0.25, BZ * W, x0 + (BX * W) / 2, y + H + 0.38, 0, M.concrete).userData.noBlueprint = f > 0;
      // X-bracing in end bays
      for (const j of [0, BZ]) {
        const z = z0 + j * W;
        strut(g, new THREE.Vector3(x0 + W, y, z), new THREE.Vector3(x0 + 2 * W, y + H, z), 0.22, 0.22, M.accent);
        strut(g, new THREE.Vector3(x0 + 2 * W, y, z), new THREE.Vector3(x0 + W, y + H, z), 0.22, 0.22, M.accent);
      }
    }
    // tower crane
    const cx = x0 + BX * W + 10;
    const cz = 6;
    const mastH = 40;
    for (const [dx, dz] of [
      [-0.9, -0.9],
      [0.9, -0.9],
      [-0.9, 0.9],
      [0.9, 0.9],
    ])
      box(g, 0.25, mastH, 0.25, cx + dx, mastH / 2, cz + dz, M.accent);
    for (let y = 2; y < mastH; y += 2.5) {
      strut(g, new THREE.Vector3(cx - 0.9, y, cz - 0.9), new THREE.Vector3(cx + 0.9, y + 2.5, cz - 0.9), 0.12, 0.12, M.accent).userData.noBlueprint = true;
      strut(g, new THREE.Vector3(cx - 0.9, y, cz + 0.9), new THREE.Vector3(cx + 0.9, y + 2.5, cz + 0.9), 0.12, 0.12, M.accent).userData.noBlueprint = true;
    }
    const slew = new THREE.Group();
    slew.position.set(cx, mastH, cz);
    g.add(slew);
    box(slew, 36, 1.2, 1.2, -10, 1, 0, M.accent);
    box(slew, 3, 2.4, 2.4, 6, 0.4, 0, M.concreteDark);
    box(slew, 2.2, 2.2, 2.2, 0, -0.6, 1.8, M.glass);
    box(slew, 0.4, 5, 0.4, 0, 3, 0, M.accent);
    const hook = box(slew, 0.08, 14, 0.08, -18, -6, 0, M.steel);
    hook.userData.noBlueprint = true;
    const load = box(slew, 6, 0.4, 0.5, -18, -13, 0, M.steel);
    load.userData.noBlueprint = true;
    animated[4] = (dt, t) => {
      slew.rotation.y = Math.sin(t * 0.25) * 0.9 + 0.6;
    };
    return g;
  }

  const builds = [buildBridge, buildInterchange, buildStadium, buildSubdivision, buildFrame];
  const groups = [];
  const prints = [];
  builds.forEach((fn, i) => {
    const g = fn();
    g.visible = false;
    scene.add(g);
    groups[i] = g;
    const bbox = new THREE.Box3().setFromObject(g);
    g.userData.height = bbox.max.y;
    g.userData.sphere = bbox.getBoundingSphere(new THREE.Sphere());
    const bp = makeBlueprint(g, { color: '#ff5b1f', threshold: 30 });
    bp.visible = false;
    scene.add(bp);
    prints[i] = bp;
  });

  /* transitions */
  let current = -1;
  let anim = null; // { from, to, t }
  // camera framing, eased toward each model's bounding sphere
  const frameTarget = new THREE.Vector3(0, 6, 0);
  let frameDist = camera.position.length();
  function frameModel(i) {
    const { center, radius } = groups[i].userData.sphere;
    frameTarget.set(center.x, center.y * 0.7, center.z);
    const vfov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const hfov = Math.atan(Math.tan(vfov) * camera.aspect);
    frameDist = (radius / Math.sin(Math.min(vfov, hfov))) * 0.84;
  }
  const _off = new THREE.Vector3();
  function easeFraming(dt) {
    const k = Math.min(1, dt * 2.2);
    controls.target.lerp(frameTarget, k);
    _off.subVectors(camera.position, controls.target);
    _off.setLength(THREE.MathUtils.lerp(_off.length(), frameDist, k));
    camera.position.copy(controls.target).add(_off);
  }

  function show(i) {
    if (i === current && !anim) return;
    frameModel(i);
    anim = { from: current, to: i, t: 0 };
    current = i;
    onChange?.(i);
  }

  function tickAnim(dt) {
    if (!anim) return;
    anim.t += dt;
    const OUT = anim.from >= 0 ? 0.55 : 0;
    const { from, to } = anim;
    if (from >= 0 && anim.t < OUT) {
      const k = easeInOutCubic(anim.t / OUT);
      const hgt = groups[from].userData.height;
      clip.constant = hgt * (1 - k) + 0.01;
      prints[from].material.uniforms.uFade.value = 1 - k;
      return;
    }
    if (from >= 0) {
      groups[from].visible = false;
      prints[from].visible = false;
    }
    const t = anim.t - OUT;
    const g = groups[to];
    const bp = prints[to];
    g.visible = true;
    bp.visible = true;
    const draw = span(t, 0, 1.1);
    const rise = easeInOutCubic(span(t, 0.75, 2.1));
    bp.material.uniforms.uProgress.value = draw * 1.02;
    bp.material.uniforms.uFade.value = 1 - span(t, 1.8, 2.6) * 0.75;
    clip.constant = rise * (g.userData.height + 1) + 0.001;
    if (t > 2.6) {
      clip.constant = 1e4;
      anim = null;
    }
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < 700 ? 44 : 32;
    // keep the model clear of the caption on wide stages
    if (w > 900) camera.setViewOffset(w, h, -w * 0.13, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    if (current >= 0) frameModel(current);
  }
  resize();
  window.addEventListener('resize', resize);

  let visible = false;
  let running = true;
  let started = false;
  const clock = new THREE.Clock();
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible && !started) {
        started = true;
        show(0);
      }
    },
    { threshold: 0.15 }
  );
  io.observe(canvas);

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!visible) return;
    if (reducedMotion && anim) anim.t += 10;
    tickAnim(dt);
    if (current >= 0) easeFraming(dt);
    animated[current]?.(dt, clock.elapsedTime);
    controls.update();
    renderer.render(scene, camera);
  }
  frame();

  return {
    show,
    dispose() {
      running = false;
      io.disconnect();
      controls.dispose();
      renderer.dispose();
    },
  };
}
