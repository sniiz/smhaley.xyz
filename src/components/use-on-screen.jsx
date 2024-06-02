// https://stackoverflow.com/a/65008608

import { useState, useEffect, useMemo } from "react";

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  // if (!ref.current) {
  //   return false;
  // }

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    if (!ref.current) {
      return () => {};
    }
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}
