import React, { useState, useEffect } from "react";

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const useWindowSize = () => {
  const [size, setSize] = useState(getWindowSize);

  useEffect(() => {
    const handleWindowResize = () => {
      setSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
