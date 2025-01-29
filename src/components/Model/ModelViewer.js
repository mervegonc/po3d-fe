import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import ColorPalette from "./ColorPalette";
import Navbar from "../../components/Navbar/Navbar"; 


const ModelViewer = ({ modelPath }) => {
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Varsayılan beyaz renk

  const { scene } = useGLTF(modelPath);

  const handleColorSelect = (color) => {
    setSelectedColor(color); // Seçilen rengi güncelle
  };

  return (
    <div>
       <Navbar /> 
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 10]} intensity={1.5} />
        {/* Model */}
        <mesh>
          <primitive object={scene} />
          <meshStandardMaterial color={selectedColor} /> {/* Rengi uygula */}
        </mesh>
        <OrbitControls />
      </Canvas>

      {/* Renk Paleti */}
      <ColorPalette onColorSelect={handleColorSelect} />
    </div>
  );
};

export default ModelViewer;