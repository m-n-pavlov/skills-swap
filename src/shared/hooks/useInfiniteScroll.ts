import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollProps {
  targetRef: RefObject<Element>;
  onIntersect: () => void;
  enabled?: boolean;
}

export function useInfiniteScroll({
  targetRef,
  onIntersect,
  enabled = true
}: UseInfiniteScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef, onIntersect, enabled]);
}
