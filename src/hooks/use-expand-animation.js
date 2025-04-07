import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useExpendAnimation(value = null) {
  const ref = useRef(value);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "-=10% 80%",
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });

    tl.from(ref.current.children, { scale: 0.5 });
  });

  return ref;
}
