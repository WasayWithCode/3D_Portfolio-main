import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";
import { useTheme } from "../../context/ThemeContext";

/* ─────────────────────────────────────────────────────────────────
   AutoCamera
───────────────────────────────────────────────────────────────── */
const PADDING = 1.08;

const AutoCamera = ({ targetRef }) => {
  const { camera, size } = useThree();
  const didFrame = useRef(false);

  useEffect(() => {
    if (!targetRef.current || didFrame.current) return;

    const box    = new THREE.Box3().setFromObject(targetRef.current);
    const centre = new THREE.Vector3();
    const sphere = new THREE.Sphere();
    box.getCenter(centre);
    box.getBoundingSphere(sphere);

    const R      = sphere.radius;
    const aspect = size.width / size.height;
    const vHalfRad = (camera.fov * Math.PI) / 360;
    const hHalfRad = Math.atan(Math.tan(vHalfRad) * aspect);
    const halfAngle = Math.min(vHalfRad, hHalfRad);
    const dist = (R / Math.tan(halfAngle)) * PADDING;

    camera.position.set(centre.x, centre.y, centre.z + dist);
    camera.lookAt(centre);
    camera.near = dist * 0.01;
    camera.far  = dist * 10;
    camera.updateProjectionMatrix();

    didFrame.current = true;
  });

  return null;
};

/* ─────────────────────────────────────────────────────────────────
   Computers – theme-aware lighting
───────────────────────────────────────────────────────────────── */
const Computers = ({ modelRef }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const { isDark } = useTheme();

  const hemiGround = isDark ? "#070A18" : "#E8EEF8";
  const rimIntensity = isDark ? 0.38 : 0.22;
  const counterIntensity = isDark ? 0.20 : 0.12;
  const bounceIntensity = isDark ? 0.18 : 0.10;
  const frontFillColor = isDark ? "#DBE4FF" : "#F0F4FF";

  return (
    <mesh>
      {/* Soft ambient – no pure-black undersides */}
      <hemisphereLight
        intensity={isDark ? 0.55 : 0.75}
        groundColor={hemiGround}
      />

      {/* Key light – upper-left, warm white */}
      <spotLight
        position={[-14, 38, 16]}
        angle={0.14}
        penumbra={1}
        intensity={isDark ? 1.7 : 1.4}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Front fill – softens monitor-bezel contrast */}
      <pointLight position={[0, 2, 11]} intensity={isDark ? 1.1 : 0.9} color={frontFillColor} />

      {/* Violet/indigo accent rim – right, matches theme */}
      <pointLight
        position={[11, 1.5, 3]}
        intensity={rimIntensity}
        color="#818CF8"
      />

      {/* Counter rim – left, subtle violet */}
      <pointLight
        position={[-7, 0, 7]}
        intensity={counterIntensity}
        color="#7C3AED"
      />

      {/* Ground bounce – lifts base/keyboard */}
      <pointLight
        position={[0, -2.5, 3]}
        intensity={bounceIntensity}
        color={isDark ? "#4338CA" : "#C7D2FE"}
      />

      <primitive
        ref={modelRef}
        object={computer.scene}
        scale={0.65}
        position={[0, 0, 0]}
        rotation={[-0.02, -0.15, -0.02]}
      />
    </mesh>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ComputersCanvas
───────────────────────────────────────────────────────────────── */
const ComputersCanvas = () => {
  const modelRef = useRef(null);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <AutoCamera targetRef={modelRef} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.4}
        />

        <Computers modelRef={modelRef} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
