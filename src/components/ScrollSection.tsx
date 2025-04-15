import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import PhoneMockup from './PhoneMockup';
// Import the images
import image1 from '../images/image-1.jpg';
import image2 from '../images/image-2.jpg';
import image3 from '../images/image-3.jpg';

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
      // Reduce threshold to start transitions earlier (was 0.4)
      const scrollThreshold = 0.2; 
      
      const newActiveSection = Math.floor(scrollPosition / sectionHeight);
      const clampedSection = Math.min(2, Math.max(0, newActiveSection));
      
      // Calculate fade progress for the current and next sections
      const currentSectionProgress = (scrollPosition % sectionHeight) / sectionHeight;
      
      // Update visibilities and opacities for smoother and earlier fade transitions
      const newVisibility = sectionVisibility.map((_, index) => {
        // Current section fades out earlier as you scroll down
        if (index === clampedSection) {
          // Accelerate the fade out by using a steeper curve
          const opacity = 1 - Math.max(0, (currentSectionProgress - scrollThreshold) / (0.6 - scrollThreshold));
          return { visible: true, opacity: Math.max(0, opacity) };
        }
        // Next section fades in earlier as current fades out
        else if (index === clampedSection + 1 && index <= 2) {
          // Accelerate the fade in by using a steeper curve
          const opacity = Math.max(0, (currentSectionProgress - scrollThreshold) / (0.6 - scrollThreshold));
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

  // Use the imported images
  const mockupImages = [
    image1,
    image2,
    image3
  ];

  return (
    <div className="bg-black min-h-[300vh]" ref={containerRef}>
      {/* Fixed phone mockup with image transition - using fixed positioning with explicit top value */}
      <div className="fixed top-[15vh] right-0 w-1/2 flex items-center justify-center">
        <div className="relative w-[380px]">
          {mockupImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-300", // Reduced from 700ms to 300ms for snappier transitions
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
        {/* Reduced min-height to prevent content overflow */}
        <div className="min-h-[95vh] flex items-center px-16">
          <div 
            className="transition-opacity duration-200" // Faster transition for text
            style={{ opacity: sectionVisibility[0]?.opacity }}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
              Think Different. <br></br>Live Bold.
            </h2>
            <p className="text-gray-400 text-xl">
            A city shaped by fog, freedom, and fearless ideas—where every street 
            feels like a story in motion.
            </p>
          </div>
        </div>

        <div className="min-h-[95vh] flex items-center px-16">
          <div 
            className="transition-opacity duration-200" // Faster transition for text
            style={{ opacity: sectionVisibility[1]?.opacity }}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
            Light. Bright. Beautiful.
            </h2>
            <p className="text-gray-400 text-xl">
            From sun-soaked shores to vibrant cities, discover a place where 
            warmth lives in both the land and its people.
            </p>
          </div>
        </div>

        <div className="min-h-[95vh] flex items-center px-16">
          <div 
            className="transition-opacity duration-200" // Faster transition for text
            style={{ opacity: sectionVisibility[2]?.opacity }}
          >
            <h2 className="text-white text-6xl font-bold mb-6">
              Power in Every Detail
            </h2>
            <p className="text-gray-400 text-xl">
            Timeless tradition and cutting-edge ambition collide in a country built on 
            depth, discipline, and dynamic change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
