import { useEffect, useLayoutEffect, useState } from "react";

const useIsMobile = (minSize) => {
  const [isMb, setIsMb] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setIsMb(width <= minSize);
  }, [width]);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return isMb;
};

export default useIsMobile;
