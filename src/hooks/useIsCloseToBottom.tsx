import { useEffect, useState } from "react";

interface isCloseProps {
  scrollHeight: number;
  clientHeight: number;
  scrollY: number;
}

/**
 * Detect if current viewport is close to the bottom
 * of the document.
 *
 * Definition of being 'close' can be adjusted,
 * for now I will asume it means that the remaining
 * scrolling space is less then 1 screen.
 *
 *
 */
export const isClose = ({
  scrollHeight,
  clientHeight,
  scrollY
}: isCloseProps): boolean => {
  return Math.abs(scrollHeight - (clientHeight + scrollY)) < clientHeight;
};

export const useIsCloseToBottom = (deps: any[]) => {
  const [isCloseToBottom, setIsCloseToBottom] = useState(false);
  useEffect(() => {
    const callback = () => {
      if (
        isClose({
          scrollHeight: document.documentElement.scrollHeight,
          clientHeight: document.documentElement.clientHeight,
          scrollY: window.scrollY
        })
      ) {
        setIsCloseToBottom(true);
      } else {
        setIsCloseToBottom(false);
      }
    };

    window.addEventListener("scroll", callback);
    window.addEventListener("resize", callback);
    callback();
    return () => {
      window.removeEventListener("scroll", callback);
      window.removeEventListener("resize", callback);
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return isCloseToBottom;
};
