import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const gltf = useGLTF("/model/futuristic_flying_animated_robot_-_low_poly.glb");
  const modelRef = useRef();

  // Auto-rotate animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Smooth rotation speed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={2.5}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const ModelViewer = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} /> {/* Disable manual drag */}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
