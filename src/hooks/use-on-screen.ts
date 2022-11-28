import { useState, useEffect, useRef } from 'react';

interface ObserverOptions {
  root: Element;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
}

export function useOnScreen(options: ObserverOptions) {
  const reference = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const { current } = reference;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return [reference, visible];
}
