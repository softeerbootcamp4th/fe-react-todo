import { useCallback, useEffect, useRef } from 'react';
import TIME from 'src/constants/time';

export default function useLongPress(onLongPress: () => void, ms = TIME.SECOND) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const start = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(onLongPress, ms);
  }, [onLongPress, ms]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', stop);
    el.addEventListener('mouseleave', stop);

    return () => {
      el.removeEventListener('mousedown', start);
      el.removeEventListener('mouseup', stop);
      el.removeEventListener('mouseleave', stop);
    };
  }, [start, stop]);

  return ref;
}
