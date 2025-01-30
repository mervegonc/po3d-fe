
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Button, Grid, Box, TextField } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ModelSelectionPage.module.css";

const ModelViewer = ({ modelPath, position, color, texture }) => {
  const { scene } = useGLTF(modelPath);
  // Update the mesh materials
  scene.traverse((node) => {
    if (node.isMesh) {
      if (texture) {
        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = textureLoader.load(texture);
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.RepeatWrapping;
        loadedTexture.repeat.set(1, 1);
        node.material.map = loadedTexture;
        node.material.map.needsUpdate = true;
        node.material.color.set("#ffffff");
      } else {
        node.material.map = null;
        node.material.color.set(color);
      }
    }
  });

  
  return <primitive object={scene} scale={0.5} position={position} />;
};
// Model data
const models = {
  complete_mugs: [
    { name: "Default Mug", path: "/models/complete_mugs/default_mug.glb"},
    { name: "y-Default Mug", path: "/models/complete_mugs/default_mug_1.glb"},
    { name: "mug-1", path: "/models/complete_mugs/mug_2.glb"},
    { name: "Tea cup", path: "/models/complete_mugs/tea-cup-1.glb"},
    { name: "Mug-2", path: "/models/complete_mugs/mug_3.glb"},
    { name: "Mug-3", path: "/models/complete_mugs/mug_4.glb"},
    { name: "Mug-4", path: "/models/complete_mugs/mug_5.glb"},
    { name: "Mug-5", path: "/models/complete_mugs/mug_6.glb"},
    { name: "Mug-6", path: "/models/complete_mugs/mug_7.glb"},
    { name: "Mug-7", path: "/models/complete_mugs/mug_0.glb" },
  ],
  handles: [
    { name: "H-1", path: "/models/parts/handles/handle_0.glb"},
    { name: "H-2", path: "/models/parts/handles/handle_1.glb" },
    { name: "H-3", path: "/models/parts/handles/handle_2.glb"},
    { name: "H-4", path: "/models/parts/handles/handle_3.glb"},
    { name: "H-5", path: "/models/parts/handles/handle_4.glb"},
    { name: "y-H-1", path: "/models/parts/handles/y-handle_0.glb"},
    { name: "y-H-2", path: "/models/parts/handles/y-handle_1.glb"},
    { name: "y-H-3", path: "/models/parts/handles/handle_2.glb"},
    { name: "y-H-4", path: "/models/parts/handles/handle_3.glb"},
    { name: "y-H-5", path: "/models/parts/handles/y-handle_4.glb"},
  ],
};
/*const patterns = [
  { name: "Flower Pattern", texture: "/models/parts/designs/pattern-1.jpg" },
];*/
function ModelSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modelPath, setModelPath] = useState(null);
  const [handlePath, setHandlePath] = useState(null);
  const [isDefaultMug, setIsDefaultMug] = useState(false);
  const [isYDefaultMug, setIsYDefaultMug] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [texture, setTexture] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  const handleModelClick = (path, category, modelName) => {
    if (category === "complete_mugs") {
      setModelPath(path);
      setHandlePath(null); // Clear handle selection
      setIsDefaultMug(modelName === "Default Mug");
      setIsYDefaultMug(modelName === "y-Default Mug");
      setTexture(null);
    } else if (category === "handles") {
      if (isDefaultMug && modelName.startsWith("H-")) {
        setHandlePath(null); // Clear existing handle to force re-render
        setTimeout(() => setHandlePath(path), 0); // Set new handle after clearing
      } else if (isYDefaultMug && modelName.startsWith("y-H-")) {
        setHandlePath(null); // Clear existing handle to force re-render
        setTimeout(() => setHandlePath(path), 0); // Set new handle after clearing
      }
    }
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
    setTexture(null);
  };
  const handlePatternClick = (pattern) => {
    setTexture(pattern.texture);
  };
  return (
<div>
<Navbar />

<div className={styles.container}>

  
  <div className={styles.layout}> {/* Flexbox veya Grid ile hizalamak için yeni bir div */}
    <div className={styles.sidebar}>
      {Object.keys(models).map((category) => (
        <Box key={category} className={styles.categoryBox}>
          <Button
            fullWidth
            variant="contained"
            color={selectedCategory === category ? "primary" : "secondary"}
            onClick={() => handleCategoryClick(category)}
            className={styles.categoryButton}
          >
            {category.replace("_", " ").toUpperCase()}
          </Button>
          {selectedCategory === category && (
            <Box className={styles.modelList}>
              {models[category]
                .filter((item) =>
                  category === "handles"
                    ? (isDefaultMug && item.name.startsWith("H-")) ||
                      (isYDefaultMug && item.name.startsWith("y-H-"))
                    : true
                )
                .map((model) => (
                  <Button
                    key={model.name}
                    fullWidth
                    className={styles.modelButton}
                    onClick={() => handleModelClick(model.path, category, model.name)}
                  >
                   
                    {model.name}
                  </Button>
                ))}
            </Box>
          )}
        </Box>
      ))}
      
      <Box className={styles.colorPickerBox}>
        <TextField
          type="color"
          fullWidth
          value={color}
          onChange={handleColorChange}
          label="Pick Color"
          variant="outlined"
          className={styles.colorPicker}
        />
      </Box>

      {/*<Box className={styles.patternBox}>
        <h4 className={styles.patternTitle}>Patterns</h4>
        {patterns.map((pattern) => (
          <Button
            key={pattern.name}
            fullWidth
            variant="contained"
            className={styles.patternButton}
            onClick={() => handlePatternClick(pattern)}
          >
            {pattern.name}
          </Button>
        ))}
      </Box>*/}
    </div>

    <div className={styles.gridContainer}>
      <Canvas key={modelPath} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={1} />
        <pointLight position={[5, -5, 5]} intensity={1} />
        <directionalLight position={[0, 10, 10]} intensity={1.5} />
        {modelPath && (
          <ModelViewer
            modelPath={modelPath}
            position={[0, 0, 0]}
            color={color}
            texture={texture}
            className={styles.modelViewer}
          />
        )}
        {handlePath && (
          <ModelViewer
            modelPath={handlePath}
            position={[0, 0, 0.4]}
            color={color}
            className={styles.modelViewer}
          />
        )}
        <OrbitControls />
      </Canvas>
    </div>
  </div>
</div>

    </div>
  );
  
}
export default ModelSelectionPage;
