
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PhoneMockup from './PhoneMockup';

const ScrollSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];
  
  useEffect(() => {
    const observers = sectionRefs.map((ref, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        {
          threshold: 0.5,
        }
      );
    });

    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs[index].current) {
          observer.unobserve(sectionRefs[index].current!);
        }
      });
    };
  }, []);

  const mockupImages = [
    "/lovable-uploads/4e82b18d-5c66-4d05-af35-50c22c36b9b0.png",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  ];

  return (
    <div className="bg-black min-h-[300vh] relative">
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-between px-8 lg:px-16">
        <div className="w-1/2">
          {/* Text sections */}
          <div
            className={cn(
              "transition-all duration-700 absolute",
              activeSection === 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
              Align with your aesthetic.
            </h2>
            <p className="text-gray-400 text-xl">
              Our improved image pipeline also enables more creative styles,
              which allow you to customize the different moods of a photo through color.
            </p>
          </div>

          <div
            className={cn(
              "transition-all duration-700 absolute",
              activeSection === 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
              Professional grade editing.
            </h2>
            <p className="text-gray-400 text-xl">
              With the power of advanced AI, you can see the style applied in
              a live preview — like professional color grading in real time.
            </p>
          </div>

          <div
            className={cn(
              "transition-all duration-700 absolute",
              activeSection === 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
              Endless possibilities.
            </h2>
            <p className="text-gray-400 text-xl">
              Transform your photos with powerful editing tools and creative filters
              that bring your vision to life.
            </p>
          </div>
        </div>

        <div className="w-1/2 flex justify-center">
          <PhoneMockup currentImage={mockupImages[activeSection]} />
        </div>
      </div>

      {/* Invisible scroll sections */}
      <div className="relative">
        {[0, 1, 2].map((section) => (
          <div
            key={section}
            ref={sectionRefs[section]}
            className="h-screen"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollSection;
