import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useUpRevealAnimation(value = null) {
  const ref = useRef(value);

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: "play none none reverse",
        start: "-=10% 80%",
        // markers: true,
      },
    });

    timeline.from(ref.current.children, {
      duration: 0.8,
      yPercent: 100,
      stagger: 0.1,
      ease: "expo.inOut",
    });
  });

  return ref;
}
