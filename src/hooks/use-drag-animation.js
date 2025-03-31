import { gsap } from "gsap";
import { useRef, useState, useEffect } from "react";

export function useDragAnimation(children, effect) {
  const ref = useRef(null);
  const [prev, setPrev] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const effectArray =
    effect === null ? [children, prev, isAnimating] : [effect];

  useEffect(() => {
    if ((isFirstRender || children !== prev) && !isAnimating) {
      setIsAnimating(true);

      const timeline = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      });

      timeline
        .to(ref.current, { x: -720 })
        .add(() => {
          setPrev(children);
          gsap.set(ref.current, { x: 720 });
        }, ">")
        .to(
          ref.current,
          {
            x: 0,
            onComplete: () => {
              setIsAnimating(false);
              if (isFirstRender) setIsFirstRender(false);
            },
          },
          ">",
        );
    }
  }, [...effectArray, isFirstRender]);

  return { ref, prev, isAnimating };
}