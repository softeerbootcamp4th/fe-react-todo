import { useCallback, useEffect, useRef, useState } from "react";

export const useLongPress = (onLongPress: () => void, ms = 300) => {
  const [currentNode, setCurrentNode] = useState<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const start = useCallback(() => {
    timerRef.current = setTimeout(onLongPress, ms);
  }, [ms, onLongPress]);

  const stop = useCallback(() => {
    if (timerRef.current == null) {
      return;
    }
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);
  useEffect(() => {
    if (!currentNode) return;
    currentNode.addEventListener("mousedown", start);
    currentNode.addEventListener("touchstart", start);
    currentNode.addEventListener("mouseup", stop);
    currentNode.addEventListener("touchend", stop);
    return () => {
      currentNode.removeEventListener("mousedown", start);
      currentNode.removeEventListener("touchstart", start);
      currentNode.removeEventListener("mouseup", stop);
      currentNode.removeEventListener("touchend", stop);
    };
  }, [currentNode, start, stop]);
  return (node: HTMLElement | null) => {
    if (node == null) {
      setCurrentNode(null);
      return;
    }
    setCurrentNode(node);
  };
};
