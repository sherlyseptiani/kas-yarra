'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement as gsap.TweenTarget);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header relative h-screen overflow-hidden">
        <div className="parallax__visuals relative w-full h-full">
          <div className="parallax__black-line-overflow absolute top-0 left-0 right-0 h-px bg-black z-10"></div>
          <div data-parallax-layers className="parallax__layers relative w-full h-full flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt="Mountains"
              className="parallax__layer-img absolute w-full h-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt="Hills"
              className="parallax__layer-img absolute w-3/4 h-3/4 object-cover rounded-lg shadow-2xl"
            />
            <div data-parallax-layer="3" className="parallax__layer-title absolute z-20 text-center">
              <h2 className="parallax__title text-6xl md:text-8xl font-bold text-white drop-shadow-lg tracking-tight">Parallax</h2>
            </div>
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Foreground"
              className="parallax__layer-img absolute w-1/2 h-1/2 object-cover rounded-lg shadow-2xl bottom-10"
            />
          </div>
          <div className="parallax__fade absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafaf7] to-transparent"></div>
        </div>
      </section>
      <section className="parallax__content min-h-screen flex items-center justify-center bg-[#fafaf7]">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none" className="mx-auto mb-8 text-amber-600">
            <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
          </svg>
          <p className="text-2xl text-gray-600">Scroll up to see the parallax effect again</p>
        </div>
      </section>
    </div>
  );
}
