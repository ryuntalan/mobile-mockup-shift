
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PhoneMockup from './PhoneMockup';

const ScrollSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      
      const newActiveSection = Math.floor(scrollPosition / sectionHeight);
      setActiveSection(Math.min(2, Math.max(0, newActiveSection)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mockupImages = [
    "/lovable-uploads/4e82b18d-5c66-4d05-af35-50c22c36b9b0.png",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  ];

  return (
    <div className="bg-black min-h-[300vh]" ref={containerRef}>
      {/* Fixed phone mockup */}
      <div className="fixed top-0 right-0 w-1/2 h-screen flex items-center justify-center">
        <PhoneMockup currentImage={mockupImages[activeSection]} />
      </div>

      {/* Scrollable text sections */}
      <div className="w-1/2 relative">
        <div className="min-h-screen flex items-center px-16">
          <div>
            <h2 className="text-white text-6xl font-bold mb-6">
              Align with your aesthetic.
            </h2>
            <p className="text-gray-400 text-xl">
              Our improved image pipeline also enables more creative styles,
              which allow you to customize the different moods of a photo through color.
            </p>
          </div>
        </div>

        <div className="min-h-screen flex items-center px-16">
          <div>
            <h2 className="text-white text-6xl font-bold mb-6">
              Professional grade editing.
            </h2>
            <p className="text-gray-400 text-xl">
              With the power of advanced AI, you can see the style applied in
              a live preview — like professional color grading in real time.
            </p>
          </div>
        </div>

        <div className="min-h-screen flex items-center px-16">
          <div>
            <h2 className="text-white text-6xl font-bold mb-6">
              Endless possibilities.
            </h2>
            <p className="text-gray-400 text-xl">
              Transform your photos with powerful editing tools and creative filters
              that bring your vision to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
