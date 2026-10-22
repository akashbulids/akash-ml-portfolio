import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PALETTES, getPaletteIndex, onPalette } from "@/lib/theme-engine";

// Shared accent materials, recolored by the color engine.
const accent = new THREE.Color(PALETTES[getPaletteIndex()]!.hex);
const accentTarget = accent.clone();
const glowMat = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false });
const lineMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.35 });
const wireMat = new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.5 });
const pointsMat = new THREE.PointsMaterial({ color: accent, size: 0.08, transparent: true, opacity: 0.8, sizeAttenuation: true });
const AMBER = new THREE.Color("#ffb547");

const rand = (s: number) => {
  const x = Math.sin(s * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

function City({ mobile }: { mobile: boolean }) {
  const count = mobile ? 120 : 260;
  const ref = useRef<THREE.InstancedMesh>(null);
  const winRef = useRef<THREE.InstancedMesh>(null);
  const { towers, windows } = useMemo(() => {
    const towers: { x: number; z: number; w: number; h: number }[] = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 ? 1 : -1;
      const x = side * (6 + rand(i) * 30);
      const z = 6 - rand(i + 99) * 70;
      towers.push({ x, z, w: 1 + rand(i + 7) * 2.5, h: 3 + Math.pow(rand(i + 3), 2) * 26 });
    }
    const windows: { x: number; y: number; z: number; warm: boolean }[] = [];
    towers.forEach((t, i) => {
      const n = Math.floor(t.h / 2);
      for (let k = 0; k < n; k++) if (rand(i * 31 + k) > 0.55) windows.push({ x: t.x - Math.sign(t.x) * (t.w / 2 + 0.02), y: 1 + k * 1.8, z: t.z + (rand(k + i) - 0.5) * t.w * 0.6, warm: rand(k * 7 + i) > 0.7 });
    });
    return { towers, windows: windows.slice(0, mobile ? 400 : 1200) };
  }, [count, mobile]);

  useEffect(() => {
    const m = new THREE.Matrix4();
    towers.forEach((t, i) => {
      m.compose(new THREE.Vector3(t.x, t.h / 2 - 2, t.z), new THREE.Quaternion(), new THREE.Vector3(t.w, t.h, t.w));
      ref.current!.setMatrixAt(i, m);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
    windows.forEach((w, i) => {
      m.compose(new THREE.Vector3(w.x, w.y - 2, w.z), new THREE.Quaternion(), new THREE.Vector3(0.05, 0.35, 0.5));
      winRef.current!.setMatrixAt(i, m);
      winRef.current!.setColorAt(i, w.warm ? AMBER : new THREE.Color("#9fb4d8"));
    });
    winRef.current!.instanceMatrix.needsUpdate = true;
    if (winRef.current!.instanceColor) winRef.current!.instanceColor.needsUpdate = true;
  }, [towers, windows]);

  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, towers.length]}>
        <boxGeometry />
        <meshStandardMaterial color="#121826" metalness={0.6} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={winRef} args={[undefined, undefined, windows.length]}>
        <boxGeometry />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -2, -30]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#0b0f19" metalness={0.8} roughness={0.25} />
      </mesh>
      <Trails mobile={mobile} />
    </group>
  );
}

function Trails({ mobile }: { mobile: boolean }) {
  const n = mobile ? 20 : 50;
  const ref = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(() => Array.from({ length: n }, (_, i) => ({ lane: (i % 4) - 1.5, off: rand(i) * 80, speed: 8 + rand(i + 5) * 10, dir: i % 2 ? 1 : -1 })), [n]);
  const m = useMemo(() => new THREE.Matrix4(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    seeds.forEach((s, i) => {
      const z = 8 - ((s.off + t * s.speed) % 80);
      m.compose(new THREE.Vector3(s.lane * 1.2, -1.9, s.dir > 0 ? z : -72 - z), new THREE.Quaternion(), new THREE.Vector3(0.08, 0.04, 2.5));
      ref.current?.setMatrixAt(i, m);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, glowMat, n]}>
      <boxGeometry />
    </instancedMesh>
  );
}

function Neural({ z }: { z: number }) {
  const group = useRef<THREE.Group>(null);
  const { positions, lines } = useMemo(() => {
    const layers = [5, 8, 8, 4];
    const pts: THREE.Vector3[][] = layers.map((c, li) => Array.from({ length: c }, (_, k) => new THREE.Vector3((li - 1.5) * 4, (k - (c - 1) / 2) * 1.3, Math.sin(k + li) * 1.2)));
    const seg: number[] = [];
    for (let l = 0; l < pts.length - 1; l++) pts[l]!.forEach((a) => pts[l + 1]!.forEach((b) => seg.push(a.x, a.y, a.z, b.x, b.y, b.z)));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { positions: pts.flat(), lines: g };
  }, []);
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({ clock }, d) => {
    if (group.current) group.current.rotation.y += d * 0.08;
    const t = (clock.elapsedTime * 0.5) % 1;
    pulse.current?.position.set(-6 + t * 12, Math.sin(t * 6) * 2, 0);
  });
  return (
    <group position={[0, 2, z]}>
      <group ref={group}>
        <lineSegments geometry={lines} material={lineMat} />
        {positions.map((p, i) => (
          <mesh key={i} position={p} material={glowMat}>
            <sphereGeometry args={[0.14, 12, 12]} />
          </mesh>
        ))}
        <mesh ref={pulse} material={glowMat}>
          <sphereGeometry args={[0.22, 12, 12]} />
        </mesh>
      </group>
      <Spinner position={[8, 3, -6]} />
      <Spinner position={[-9, -2, -4]} knot />
    </group>
  );
}

function Spinner({ position, knot }: { position: [number, number, number]; knot?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.3;
    ref.current.rotation.y += d * 0.2;
  });
  return (
    <mesh ref={ref} position={position} material={wireMat}>
      {knot ? <torusKnotGeometry args={[1.6, 0.4, 80, 10]} /> : <icosahedronGeometry args={[2.2, 1]} />}
    </mesh>
  );
}

function DataField({ z }: { z: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 12;
  const m = useMemo(() => new THREE.Matrix4(), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    let i = 0;
    for (let x = 0; x < N; x++)
      for (let k = 0; k < N; k++) {
        const h = 0.4 + (Math.sin(x * 0.6 + t) + Math.cos(k * 0.5 + t * 0.7) + 2) * 1.4;
        m.compose(new THREE.Vector3((x - N / 2) * 1.1, h / 2 - 2, (k - N / 2) * 1.1), new THREE.Quaternion(), new THREE.Vector3(0.6, h, 0.6));
        ref.current?.setMatrixAt(i++, m);
      }
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  });
  const curve = useMemo(() => {
    const pts = Array.from({ length: 80 }, (_, i) => new THREE.Vector3((i - 40) * 0.25, 4 + Math.sin(i / 8) * 1.5, -8));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  return (
    <group position={[0, 0, z]}>
      <instancedMesh ref={ref} args={[undefined, undefined, N * N]}>
        <boxGeometry />
        <meshStandardMaterial color="#1b2436" metalness={0.7} roughness={0.3} emissive={accent} emissiveIntensity={0.15} />
      </instancedMesh>
      <line>
        <primitive object={curve} attach="geometry" />
        <primitive object={lineMat} attach="material" />
      </line>
    </group>
  );
}

function Portal({ z }: { z: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.15;
  });
  return (
    <group position={[0, 1, z]} ref={ref}>
      <mesh material={glowMat}>
        <torusGeometry args={[5, 0.06, 16, 120]} />
      </mesh>
      <mesh material={wireMat}>
        <torusGeometry args={[5.6, 0.5, 8, 48]} />
      </mesh>
    </group>
  );
}

function Particles({ mobile }: { mobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = mobile ? 600 : 1800;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (rand(i) - 0.5) * 60;
      a[i * 3 + 1] = rand(i + 1) * 25 - 2;
      a[i * 3 + 2] = 10 - rand(i + 2) * 170;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return g;
  }, [mobile]);
  useFrame(({ pointer }, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += (pointer.x * 0.05 - ref.current.rotation.y) * Math.min(1, d * 2);
  });
  return <points ref={ref} geometry={geo} material={pointsMat} />;
}

function Rig({ mobile, reduce }: { mobile: boolean; reduce: boolean }) {
  const { camera, scene } = useThree();
  const light = useRef<THREE.PointLight>(null);
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame(({ pointer }, raw) => {
    const dt = Math.min(raw, 0.05);
    accent.lerp(accentTarget, 1 - Math.exp(-3 * dt));
    lineMat.color.copy(accent);
    wireMat.color.copy(accent);
    pointsMat.color.copy(accent);
    (scene.fog as THREE.Fog).color.setRGB(0.04 + accent.r * 0.03, 0.05 + accent.g * 0.03, 0.09 + accent.b * 0.04);
    const p = progress.current;
    const targetZ = 10 - p * 150;
    const k = 1 - Math.exp(-4 * dt);
    const px = mobile || reduce ? 0 : pointer.x * 1.6;
    const py = mobile || reduce ? 0 : pointer.y * 0.8;
    camera.position.x += (px - camera.position.x) * k;
    camera.position.y += (2.5 + py - camera.position.y) * k;
    camera.position.z += (targetZ - camera.position.z) * k;
    camera.lookAt(camera.position.x * 0.3, 2, camera.position.z - 12);
    if (light.current) {
      light.current.position.set(pointer.x * 10, 6 + pointer.y * 4, camera.position.z - 8);
      light.current.color.copy(accent);
    }
  });
  return <pointLight ref={light} intensity={60} distance={40} />;
}

export default function Universe3D() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => onPalette((i) => accentTarget.set(PALETTES[i]!.hex)) as () => void, []);
  return (
    <Canvas dpr={[1, mobile ? 1.25 : 1.75]} camera={{ position: [0, 2.5, 10], fov: 60 }} gl={{ antialias: !mobile, powerPreference: "high-performance" }}>
      <color attach="background" args={["#070a12"]} />
      <fog attach="fog" args={["#0a0e18", 12, 60]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 20, 5]} intensity={0.8} color="#b9c8ff" />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} position={[0, 8, -10]} scale={[30, 4, 1]} color="#8fb4ff" />
        <Lightformer intensity={0.8} position={[-10, 2, 0]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} color="#ffb547" />
      </Environment>
      <Rig mobile={mobile} reduce={reduce} />
      <City mobile={mobile} />
      <Particles mobile={mobile} />
      <Neural z={-50} />
      <DataField z={-95} />
      <Portal z={-140} />
    </Canvas>
  );
}
