import React, { useState, useEffect } from "react";

const Progressive = ({ src, placeholder, ...props }) => {
  const [source, setSource] = useState(placeholder || src);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setSource(src);
  }, [src]);

  return <img {...props} src={source} />;
};

export default Progressive;
