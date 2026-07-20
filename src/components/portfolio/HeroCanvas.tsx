'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/providers/Theme'

/**
 * Hero backdrop: a noise-displaced wireframe icosahedron inside a drifting
 * particle shell. Colours are uniforms so a theme switch re-tints the scene
 * without rebuilding it.
 *
 * Bails out entirely when WebGL is unavailable or the user prefers reduced
 * motion, and parks the render loop whenever the tab or the hero is hidden.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPointer;
  varying float vNoise;

  // Classic 3D simplex-ish value noise, cheap enough for a per-frame vertex pass.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    float noise = snoise(normal * 1.1 + uTime * 0.18);
    vNoise = noise;
    float displacement = noise * (0.22 + uPointer * 0.16);
    vec3 displaced = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vNoise;

  void main() {
    vec3 color = mix(uColorA, uColorB, smoothstep(-0.7, 0.7, vNoise));
    gl_FragColor = vec4(color, uOpacity);
  }
`

const PALETTE = {
  dark: { a: '#35e08b', b: '#8ff7c4', meshOpacity: 0.3, particleOpacity: 0.5, particles: '#35e08b' },
  light: { a: '#10784a', b: '#17a566', meshOpacity: 0.26, particleOpacity: 0.34, particles: '#10784a' },
}

export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  // Kept in a ref so a theme change re-tints without tearing down the scene.
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return // No WebGL — the static gradient behind this canvas stands in.
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.z = 4.2

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearAlpha(0)
    // Without an explicit colour space the shader output gets double-converted and
    // the greens drift toward cyan once composited over the page background.
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    host.appendChild(renderer.domElement)

    const palette = PALETTE[themeRef.current === 'dark' ? 'dark' : 'light']

    const uniforms = {
      uColorA: { value: new THREE.Color(palette.a) },
      uColorB: { value: new THREE.Color(palette.b) },
      uOpacity: { value: palette.meshOpacity },
      uPointer: { value: 0 },
      uTime: { value: 0 },
    }

    // Detail 4 keeps the facets legible as a backdrop; higher values turn the
    // wireframe into a solid mass that competes with the hero copy.
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 4),
      new THREE.ShaderMaterial({
        depthWrite: false,
        fragmentShader: FRAGMENT,
        transparent: true,
        uniforms,
        vertexShader: VERTEX,
        wireframe: true,
      }),
    )
    scene.add(mesh)

    // Particle shell — points scattered in a hollow sphere around the mesh.
    const COUNT = 1400
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const radius = 2.1 + Math.random() * 1.9
      const angle = Math.random() * Math.PI * 2
      const tilt = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(tilt) * Math.cos(angle)
      positions[i * 3 + 1] = radius * Math.sin(tilt) * Math.sin(angle)
      positions[i * 3 + 2] = radius * Math.cos(tilt)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    // Additive blending only reads correctly on a dark page; over a light one it
    // blows out toward white and tints whatever sits behind it.
    const particleMaterial = new THREE.PointsMaterial({
      blending: themeRef.current === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
      color: new THREE.Color(palette.particles),
      depthWrite: false,
      opacity: palette.particleOpacity,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const resize = () => {
      const { height, width } = host.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)

    // Pointer parallax, normalised to [-1, 1] and eased toward the target.
    const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth) * 2 - 1
      pointer.targetY = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    let visible = true
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersectionObserver.observe(host)

    const onVisibility = () => {
      if (document.hidden) visible = false
    }
    document.addEventListener('visibilitychange', onVisibility)

    const clock = new THREE.Clock()
    let frame = 0
    let lastTheme = themeRef.current

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const elapsed = clock.getElapsedTime()
      if (!visible && !document.hidden) return
      if (document.hidden) return

      if (themeRef.current !== lastTheme) {
        lastTheme = themeRef.current
        const next = PALETTE[lastTheme === 'dark' ? 'dark' : 'light']
        uniforms.uColorA.value.set(next.a)
        uniforms.uColorB.value.set(next.b)
        uniforms.uOpacity.value = next.meshOpacity
        particleMaterial.color.set(next.particles)
        particleMaterial.opacity = next.particleOpacity
        particleMaterial.blending = lastTheme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending
        particleMaterial.needsUpdate = true
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.05
      pointer.y += (pointer.targetY - pointer.y) * 0.05

      uniforms.uTime.value = elapsed
      uniforms.uPointer.value = Math.min(Math.hypot(pointer.x, pointer.y), 1)

      mesh.rotation.y = elapsed * 0.12 + pointer.x * 0.35
      mesh.rotation.x = Math.sin(elapsed * 0.16) * 0.18 + pointer.y * 0.22
      particles.rotation.y = -elapsed * 0.045 + pointer.x * 0.16
      particles.rotation.x = pointer.y * 0.1

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      mesh.geometry.dispose()
      ;(mesh.material as THREE.ShaderMaterial).dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div aria-hidden className="pointer-events-none absolute inset-0 [&>canvas]:size-full" ref={hostRef} />
}
