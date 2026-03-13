import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { Model } from "./Avatar";

export default function Avatar3D() {
  return (
    <div style={{ 
      width: "300px", 
      height: "400px", 
      margin: "0 auto", 
      position: "relative",
      background: "transparent"
    }}>
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 40 }} 
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        <Environment preset="city" background={false} />
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          <Center>
            <Model />
          </Center>
          
          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2} far={2} />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}