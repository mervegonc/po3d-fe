
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
    { name: "Default Mug", path: "/models/complete_mugs/default_mug.glb", thumbnail: "/thumbnails/complete_mugs/default_mug.png" },
    { name: "y-Default Mug", path: "/models/complete_mugs/default_mug_1.glb", thumbnail: "/thumbnails/complete_mugs/default_mug.png" },
    { name: "mug-1", path: "/models/complete_mugs/mug_2.glb", thumbnail: "/thumbnails/complete_mugs/mug_2.png" },
    { name: "Tea cup", path: "/models/complete_mugs/tea-cup-1.glb", thumbnail: "/thumbnails/complete_mugs/tea-cup-1.png" },
    { name: "Mug-2", path: "/models/complete_mugs/mug_3.glb", thumbnail: "/thumbnails/complete_mugs/mug_3.png" },
    { name: "Mug-3", path: "/models/complete_mugs/mug_4.glb", thumbnail: "/thumbnails/complete_mugs/mug_4.png" },
    { name: "Mug-4", path: "/models/complete_mugs/mug_5.glb", thumbnail: "/thumbnails/complete_mugs/mug_5.png" },
    { name: "Mug-5", path: "/models/complete_mugs/mug_6.glb", thumbnail: "/thumbnails/complete_mugs/mug_6.png" },
    { name: "Mug-6", path: "/models/complete_mugs/mug_7.glb", thumbnail: "/thumbnails/complete_mugs/mug_7.png" },
    { name: "Mug-7", path: "/models/complete_mugs/mug_0.glb", thumbnail: "/thumbnails/complete_mugs/mug_0.png" },
  ],
  handles: [
    { name: "H-1", path: "/models/parts/handles/handle_0.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "H-2", path: "/models/parts/handles/handle_1.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "H-3", path: "/models/parts/handles/handle_2.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "H-4", path: "/models/parts/handles/handle_3.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "H-5", path: "/models/parts/handles/handle_4.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "y-H-1", path: "/models/parts/handles/y-handle_0.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "y-H-2", path: "/models/parts/handles/y-handle_1.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "y-H-3", path: "/models/parts/handles/handle_2.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "y-H-4", path: "/models/parts/handles/handle_3.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
    { name: "y-H-5", path: "/models/parts/handles/y-handle_4.glb", thumbnail: "/thumbnails/parts/handles/handle_1.png" },
  ],
};

const patterns = [
  { name: "Flower Pattern", texture: "/models/parts/designs/pattern-1.jpg" },
];

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
    <Grid container spacing={2} sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
  
      <Grid item xs={2} sx={{ backgroundColor: "#e0e0e0", padding: 2 }}>
        {Object.keys(models).map((category) => (
          <Box key={category} sx={{ mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color={selectedCategory === category ? "primary" : "secondary"}
              onClick={() => handleCategoryClick(category)}
            >
              {category.replace("_", " ").toUpperCase()}
            </Button>
            {selectedCategory === category && (
              <Box sx={{ mt: 2 }}>
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
                      sx={{ display: "flex", alignItems: "center", justifyContent: "start", mb: 1 }}
                      onClick={() => handleModelClick(model.path, category, model.name)}
                    >
                      <img
                        src={model.thumbnail}
                        alt={model.name}
                        style={{ width: 40, height: 40, marginRight: 8, borderRadius: 4 }}
                      />
                      {model.name}
                    </Button>
                  ))}
              </Box>
            )}
          </Box>
        ))}

      
        <Box sx={{ mt: 4 }}>
          <TextField
            type="color"
            fullWidth
            value={color}
            onChange={handleColorChange}
            label="Pick Color"
            variant="outlined"
          />
        </Box>

       
        <Box sx={{ mt: 4 }}>
          <h4>Patterns</h4>
          {patterns.map((pattern) => (
            <Button
              key={pattern.name}
              fullWidth
              variant="contained"
              sx={{ mb: 1 }}
              onClick={() => handlePatternClick(pattern)}
            >
              {pattern.name}
            </Button>
          ))}
        </Box>
      </Grid>

      
      <Grid item xs={10}>
        <Canvas key={modelPath} camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[-5, 5, 5]} intensity={1} />
          <pointLight position={[5, -5, 5]} intensity={1} />
          <directionalLight position={[0, 10, 10]} intensity={1.5} />
          {modelPath && <ModelViewer modelPath={modelPath} position={[0, 0, 0]} color={color} texture={texture} />}
          {handlePath && <ModelViewer modelPath={handlePath} position={[0, 0, 0.4]} color={color} />}
          <OrbitControls />
        </Canvas>
      </Grid>
    </Grid>
    </div>
  );
}

export default ModelSelectionPage;
