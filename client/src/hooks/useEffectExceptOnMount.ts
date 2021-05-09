import { useEffect, useRef } from "react";

export const useEffectExceptOnMount = (effect, dependencies) => {
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      const unmount = effect();
      return () => unmount && unmount();
    } else {
      mounted.current = true;
    }
  }, dependencies);

  // Reset on unmount for the next mount.
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
};
