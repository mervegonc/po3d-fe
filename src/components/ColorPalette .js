import React from "react";

const ColorPalette = ({ onColorSelect }) => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffffff", "#000000"];

  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => onColorSelect(color)}
          style={{
            width: 30,
            height: 30,
            backgroundColor: color,
            border: "1px solid #000",
            marginRight: 5,
            cursor: "pointer",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
