import { useRef } from "react";

const useDrag = () => {
  const dragStartPosition = useRef(null);
  const dragEndPosition = useRef(null);
  const timerRef = useRef(null);

  const dragControlInfo = {
    dragStartPosition,
    dragEndPosition,
    timerRef,
  };

  const onDragStartHandler = (target) => {
    dragStartPosition.current = target;
    clearTimeout(timerRef.current);
  };

  const onDragEnterHandler = (target) => {
    dragEndPosition.current = target;
  };

  const resetDragInfo = () => {
    dragStartPosition.current = null;
    dragEndPosition.current = null;
  };

  return {
    dragControlInfo,
    onDragStartHandler,
    onDragEnterHandler,
    resetDragInfo,
  };
};

export default useDrag;
