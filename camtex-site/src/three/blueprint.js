import * as THREE from 'three';

/**
 * Builds one merged LineSegments "blueprint" overlay from every mesh in `root`.
 * Each edge gets an aT value (0..1) so the drawing can be revealed with uProgress —
 * roughly bottom-up with a little scatter, like a drafter working across the sheet.
 */
export function makeBlueprint(root, { color = '#ff5b1f', threshold = 20, opacity = 1, axis = 'y' } = {}) {
  root.updateMatrixWorld(true);
  const positions = [];
  const box = new THREE.Box3().setFromObject(root);
  const min = box.min[axis];
  const range = Math.max(box.max[axis] - min, 1e-3);
  const v = new THREE.Vector3();
  const im = new THREE.Matrix4();

  root.traverse((o) => {
    if (!o.isMesh || o.userData.noBlueprint) return;
    const edges = new THREE.EdgesGeometry(o.geometry, threshold);
    const p = edges.attributes.position;
    const instances = o.isInstancedMesh ? o.count : 1;
    for (let n = 0; n < instances; n++) {
      if (o.isInstancedMesh) {
        o.getMatrixAt(n, im);
        im.premultiply(o.matrixWorld);
      }
      else im.copy(o.matrixWorld);
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i).applyMatrix4(im);
        positions.push(v.x, v.y, v.z);
      }
    }
    edges.dispose();
  });

  const count = positions.length / 3;
  const aT = new Float32Array(count);
  for (let i = 0; i < count; i += 2) {
    const ya = positions[i * 3 + (axis === 'x' ? 0 : axis === 'y' ? 1 : 2)];
    const yb = positions[(i + 1) * 3 + (axis === 'x' ? 0 : axis === 'y' ? 1 : 2)];
    const t = ((Math.min(ya, yb) - min) / range) * 0.75 + Math.random() * 0.25;
    aT[i] = aT[i + 1] = t;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('aT', new THREE.BufferAttribute(aT, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uProgress: { value: 0 },
      uFade: { value: 1 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    vertexShader: /* glsl */ `
      attribute float aT;
      varying float vT;
      void main() {
        vT = aT;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform float uProgress;
      uniform float uFade;
      uniform float uOpacity;
      uniform vec3 uColor;
      varying float vT;
      void main() {
        if (vT > uProgress) discard;
        // freshly drawn edges flare bright, then settle
        float fresh = smoothstep(0.08, 0.0, uProgress - vT);
        vec3 col = mix(uColor, vec3(1.0, 0.92, 0.82), fresh * 0.8);
        gl_FragColor = vec4(col, uOpacity * uFade * (0.55 + fresh * 0.45));
      }`,
  });

  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  return lines;
}

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const clamp01 = (t) => Math.min(1, Math.max(0, t));
/** Remap t from [a,b] to [0,1], clamped. */
export const span = (t, a, b) => clamp01((t - a) / (b - a));
