import { useEffect, useRef } from "react";

export const useLongPress = (onLongPress: () => void, ms = 300) => {
  let timer: number;

  const ref = useRef<HTMLDivElement | null>(null);
  const start = () => {
    timer = setTimeout(onLongPress, ms);
  };

  const stop = () => {
    clearTimeout(timer);
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    el.addEventListener("mouseup", stop);
    el.addEventListener("touchend", stop);
    return () => {
      el.removeEventListener("mousedown", start);
      el.removeEventListener("touchstart", start);
      el.removeEventListener("mouseup", stop);
      el.removeEventListener("touchend", stop);
    };
  });
  return ref;
};
