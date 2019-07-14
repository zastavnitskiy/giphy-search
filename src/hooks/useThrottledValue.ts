import { useState, useEffect, useRef } from "react";

/**
 * This is an effect that creates a throttled copy of
 * a state variable.
 *
 * Strongly inpired by https://github.com/bhaskarGyan/use-throttle/blob/master/src/index.js
 */
export function useThrottledValue<T>(value: T, limitMs: number) {
  const [throttled, setThrottled] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const timeout = window.setTimeout(function() {
      if (Date.now() - lastRan.current >= limitMs) {
        setThrottled(value);
        lastRan.current = Date.now();
      }
    }, limitMs - (Date.now() - lastRan.current));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [value, limitMs]);

  return throttled;
}
