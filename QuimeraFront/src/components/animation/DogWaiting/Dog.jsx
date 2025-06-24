import lottie from "lottie-web";
import React from "react";

import animationDog from "./animationDog.json";

export default function Dog() {
  const animRef = React.useRef();

  React.useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationDog,
    });

    return () => anim.destroy();
  }, []);

  return <div id="lottie-animation" ref={animRef}></div>;
}
