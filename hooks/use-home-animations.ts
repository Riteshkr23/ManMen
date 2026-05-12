"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations() {
  useEffect(() => {
    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      heroTimeline
        .fromTo(
          ".hero-visual",
          { scale: 1.18, filter: "blur(12px)", opacity: 0 },
          { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.6 },
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.8",
        );

      gsap.to(".hero-depth", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=160%",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 0.8,
      });

      gsap.fromTo(
        ".reveal-visual",
        { scale: 0.88, y: 90, opacity: 0.25 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".reveal",
            start: "top 85%",
            end: "bottom 35%",
            scrub: true,
          },
        },
      );

      const horizontal = document.querySelector<HTMLElement>(".horizontal-track");
      if (horizontal) {
        const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal",
            start: "top top",
            end: () => `+=${horizontal.offsetWidth}`,
            pin: true,
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".features",
            start: "top 75%",
          },
        },
      );

      const cinematicWords = gsap.utils.toArray<HTMLElement>(".cinematic-line");
      cinematicWords.forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0.15, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".cinematic",
              start: `${index * 15 + 10}% center`,
              end: `${index * 15 + 18}% center`,
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".shop-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".home-grid",
            start: "top 80%",
          },
        },
      );
    });

    return () => context.revert();
  }, []);
}
