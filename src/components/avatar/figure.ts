import * as THREE from 'three'

/**
 * Beatrice als illustratie die knippert en glimlacht.
 * De illustratie ligt op een fijn raster: de glimlach is een kleine
 * vervorming rond de mondhoeken en wangen in de vertex-shader, het
 * knipperen en blozen gebeuren in de fragment-shader.
 */

// Afmetingen van de illustratie in pixels
const W = 720
const H = 2373
// Om de hoeveel seconden ze knippert
const BLINK_EVERY = 2

const vertexShader = /* glsl */ `
  uniform float uSmile;
  varying vec2 vUv;

  const vec2 SIZE = vec2(${W}.0, ${H}.0);

  float bump(vec2 p, vec2 c, float r) {
    vec2 d = (p - c) / r;
    return exp(-dot(d, d));
  }

  void main() {
    vUv = uv;
    // Beeldcoördinaten in pixels, y naar beneden
    vec2 p = vec2(uv.x * SIZE.x, (1.0 - uv.y) * SIZE.y);
    // Glimlach: mondhoeken iets omhoog en naar buiten, wangen mee omhoog
    p += uSmile * (vec2(-2.5, -5.0) * bump(p, vec2(224.0, 306.0), 20.0)
                 + vec2(2.5, -5.0) * bump(p, vec2(316.0, 288.0), 20.0)
                 + vec2(0.0, -3.0) * bump(p, vec2(180.0, 285.0), 38.0)
                 + vec2(0.0, -3.0) * bump(p, vec2(335.0, 262.0), 40.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x - SIZE.x * 0.5, SIZE.y - p.y, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uBlink;
  uniform float uBlush;
  varying vec2 vUv;

  const vec2 SIZE = vec2(${W}.0, ${H}.0);

  vec2 toUv(vec2 p) {
    return vec2(p.x / SIZE.x, 1.0 - p.y / SIZE.y);
  }

  // Ooglid dat van boven naar beneden over het oog schuift
  vec4 eyelid(vec4 col, vec2 p, vec2 c, vec2 r, float a) {
    vec2 q = p - c;
    float s = sin(-a);
    float co = cos(-a);
    q = vec2(co * q.x - s * q.y, s * q.x + co * q.y) / r;
    float rr = dot(q, q);
    if (rr > 1.0 || uBlink < 0.02) return col;
    float h = sqrt(max(0.0, 1.0 - q.x * q.x));
    float t = q.y / max(h, 0.001); // -1 boven, 1 onder
    float edge = -1.0 + 2.0 * uBlink;
    // Zachte rand, zodat er geen omtrek van de ellips zichtbaar wordt
    float soft = 1.0 - smoothstep(0.7, 1.0, rr);
    if (t < edge) {
      // Huid net boven het oog doortrekken
      vec2 src = p - vec2(-s, co) * r.y * 1.25;
      vec3 lid = texture2D(uMap, toUv(src)).rgb * 0.95;
      col.rgb = mix(col.rgb, lid, soft);
    }
    // Wimperlijn langs de rand van het ooglid
    float lash = (1.0 - smoothstep(0.0, 0.14, abs(t - edge))) * smoothstep(0.15, 0.45, uBlink) * (1.0 - smoothstep(0.75, 0.95, abs(q.x)));
    col.rgb = mix(col.rgb, vec3(0.12, 0.06, 0.04), lash * 0.85 * soft);
    return col;
  }

  void main() {
    vec2 p = vec2(vUv.x * SIZE.x, (1.0 - vUv.y) * SIZE.y);
    vec4 col = texture2D(uMap, vUv);
    col = eyelid(col, p, vec2(203.0, 231.0), vec2(28.0, 17.0), -0.12);
    col = eyelid(col, p, vec2(291.0, 206.0), vec2(32.0, 19.0), -0.2);
    float b = (1.0 - smoothstep(0.0, 42.0, distance(p, vec2(176.0, 292.0))))
            + (1.0 - smoothstep(0.0, 46.0, distance(p, vec2(338.0, 266.0))));
    col.rgb = mix(col.rgb, vec3(0.93, 0.42, 0.5), uBlush * 0.28 * b);
    gl_FragColor = vec4(col.rgb * col.a, col.a);
  }
`

export class BeatriceFigure {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10)
  private clock = new THREE.Clock()
  private uniforms = {
    uMap: { value: null as THREE.Texture | null },
    uSmile: { value: 0 },
    uBlink: { value: 0 },
    uBlush: { value: 0 },
  }
  private reduceMotion: boolean
  ready = false

  constructor(canvas: HTMLCanvasElement, imageUrl: string, reduceMotion = false, onReady?: () => void, onError?: () => void) {
    this.reduceMotion = reduceMotion
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace

    new THREE.TextureLoader().load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.NoColorSpace
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.anisotropy = 4
        this.uniforms.uMap.value = tex
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(W, H, 90, 280),
          new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            premultipliedAlpha: true,
            depthWrite: false,
          }),
        )
        mesh.frustumCulled = false
        this.scene.add(mesh)
        this.ready = true
        onReady?.()
      },
      undefined,
      () => onError?.(),
    )
  }

  resize(width: number, height: number) {
    this.renderer.setSize(width, height, false)
    const aspect = width / height
    let halfH = (H * 1.03) / 2
    let halfW = halfH * aspect
    if (halfW < W * 0.55) {
      halfW = W * 0.55
      halfH = halfW / aspect
    }
    this.camera.left = -halfW
    this.camera.right = halfW
    this.camera.top = H / 2 + halfH
    this.camera.bottom = H / 2 - halfH
    this.camera.updateProjectionMatrix()
  }

  render() {
    const t = this.clock.getElapsedTime()
    const u = this.uniforms
    if (this.reduceMotion) {
      u.uBlink.value = 0
      u.uSmile.value = 0
    } else {
      // Knipperen: elke twee seconden, kort en snel
      const k = (t % BLINK_EVERY) / 0.18
      const blink = k < 1 ? Math.sin(k * Math.PI) : 0
      // Glimlachen: de glimlach wordt na elke knipper even breder en zakt weer terug
      const s = (t % BLINK_EVERY) / BLINK_EVERY
      const smile = Math.pow(Math.sin(Math.PI * Math.min(1, s * 1.4)), 2)
      u.uSmile.value = smile
      u.uBlink.value = blink
      u.uBlush.value = smile * 0.45
    }
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh) {
        m.geometry.dispose()
        ;(m.material as THREE.Material).dispose()
      }
    })
    this.uniforms.uMap.value?.dispose()
    this.renderer.dispose()
  }
}
