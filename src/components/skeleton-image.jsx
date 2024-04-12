import { useState } from "react";

export default function SkeletonImg({ src, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          className={`bg-gray-300 animate-skeleton ${props.className || ""}`}
        />
      )}
      <img
        src={src}
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? props.className : "hidden"}
        {...props}
      />
    </>
  );
}
