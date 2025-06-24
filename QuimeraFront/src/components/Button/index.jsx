import { useState } from "react";

const Button = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  return (
    <button
      onMouseMove={handleMouseMove}
      style={{ position: "absolute", left: x, top: y }}
    >
      Move me!
    </button>
  );
};

export default Button;
