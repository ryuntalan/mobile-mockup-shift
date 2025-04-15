import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PhoneMockup from './PhoneMockup';

const ScrollSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [lastActiveSection, setLastActiveSection] = useState(0);
  const [sectionVisibility, setSectionVisibility] = useState([
    { visible: true, opacity: 1 },
    { visible: false, opacity: 0 },
    { visible: false, opacity: 0 },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const scrollThreshold = 0.4; // When to start fading (40% into the section)
      
      const newActiveSection = Math.floor(scrollPosition / sectionHeight);
      const clampedSection = Math.min(2, Math.max(0, newActiveSection));
      
      // Calculate fade progress for the current and next sections
      const currentSectionProgress = (scrollPosition % sectionHeight) / sectionHeight;
      
      // Update visibilities and opacities for smooth fade transitions
      const newVisibility = sectionVisibility.map((_, index) => {
        // Current section fades out as you scroll down
        if (index === clampedSection) {
          const opacity = 1 - Math.max(0, (currentSectionProgress - scrollThreshold) / (1 - scrollThreshold));
          return { visible: true, opacity: Math.max(0, opacity) };
        }
        // Next section fades in as current fades out
        else if (index === clampedSection + 1 && index <= 2) {
          const opacity = Math.max(0, (currentSectionProgress - scrollThreshold) / (1 - scrollThreshold));
          return { visible: true, opacity };
        }
        // Other sections are hidden
        else {
          return { visible: false, opacity: 0 };
        }
      });
      
      setSectionVisibility(newVisibility);
      
      if (clampedSection !== activeSection) {
        setLastActiveSection(activeSection);
        setActiveSection(clampedSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set up visibility states
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, sectionVisibility]);

  const mockupImages = [
    "/lovable-uploads/4e82b18d-5c66-4d05-af35-50c22c36b9b0.png",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  ];

  return (
    <div className="bg-black min-h-[300vh]" ref={containerRef}>
      {/* Fixed phone mockup with image transition - centered vertically */}
      <div className="fixed top-1/2 right-0 w-1/2 -translate-y-1/2 flex items-center justify-center pr-16">
        <div className="relative w-[380px]"> {/* Fixed width to ensure consistent sizing */}
          {mockupImages.map((image, index) => (
            <div
              key={image}
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                index === activeSection || 
                (index === activeSection + 1 && sectionVisibility[index]?.opacity > 0) ? 
                "opacity-" + Math.round(index === activeSection ? sectionVisibility[index]?.opacity * 100 : sectionVisibility[index]?.opacity * 100) : 
                "opacity-0"
              )}
              style={{ 
                opacity: index === activeSection ? sectionVisibility[index]?.opacity : 
                         index === activeSection + 1 ? sectionVisibility[index]?.opacity : 0 
              }}
            >
              <PhoneMockup currentImage={image} />
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable text sections with improved fade transitions */}
      <div className="w-1/2 relative pl-24"> {/* Left padding for text */}
        <div className="min-h-screen flex items-center px-16">
          <div 
            className="transition-opacity duration-300"
            style={{ opacity: sectionVisibility[0]?.opacity }}
          >
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
          <div 
            className="transition-opacity duration-300"
            style={{ opacity: sectionVisibility[1]?.opacity }}
          >
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
          <div 
            className="transition-opacity duration-300"
            style={{ opacity: sectionVisibility[2]?.opacity }}
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
      </div>
    </div>
  );
};

export default ScrollSection;
