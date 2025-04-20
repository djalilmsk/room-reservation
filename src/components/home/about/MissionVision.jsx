import { Section, SectionTitle } from "@/components/ui/section";
import { cards } from "@/utils/data/mission-vision";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function MissionVision() {
  const scrollRef = useRef(null);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    const element = scrollRef.current;
    const totalWidth = element.scrollWidth / 2;

    const anim = gsap.to(element, {
      x: `-${totalWidth}px`,
      duration: 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    setAnimation(anim);

    return () => anim.kill();
  }, []);

  const handleMouseEnter = () => {
    if (animation) {
      animation.timeScale(0.5);
    }
  };

  const handleMouseLeave = () => {
    if (animation) {
      animation.timeScale(1);
    }
  };

  return (
    <Section className="relative max-md:h-60 max-xl:md:py-10 xl:pb-10">
      <div className="bg-secondary/50 absolute -bottom-0 left-1/2 -z-10 h-full w-screen -translate-x-1/2 transform" />
      <SectionTitle>Mission & Vision</SectionTitle>

      <div
        className="pt- absolute flex gap-4 overflow-x-auto"
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...cards, ...cards].map((card, index) => (
          <div
            key={index}
            className="relative w-[180px] shrink-0 overflow-hidden rounded-xl md:w-[230px]"
          >
            <img
              src={card.img}
              alt="image"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-between p-4 text-white dark:bg-black/40">
              <card.icon className="h-8 w-8" />
              <p className="md:text-md text-sm leading-snug font-semibold">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="aspect-square w-[230px]" />
    </Section>
  );
}

export default MissionVision;
