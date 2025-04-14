
import React from 'react';
import { cn } from '@/lib/utils';

interface PhoneMockupProps {
  currentImage: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ currentImage }) => {
  return (
    <div className="relative w-[380px] h-[780px]">
      {/* Phone frame */}
      <div className="absolute inset-0 bg-black rounded-[60px] border-4 border-gray-800">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-3xl" />
        
        {/* Screen content */}
        <div className="absolute top-0 left-0 right-0 bottom-0 m-3 rounded-[48px] overflow-hidden bg-black">
          {/* Top bar */}
          <div className="h-14 bg-black flex items-center justify-between px-4 border-b border-gray-800">
            <span className="text-gray-400">Cancel</span>
            <span className="text-white">STYLES</span>
            <span className="text-yellow-400">Done</span>
          </div>
          
          {/* Main image */}
          <div className="relative h-[calc(100%-180px)]">
            <img
              src={currentImage}
              alt="Phone content"
              className="w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 rounded text-xs text-white">
              LUMINOUS
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-black/90 border-t border-gray-800 flex justify-around items-center px-6">
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-700 rounded mb-1 mx-auto" />
              <span className="text-white text-xs">Styles</span>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-700 rounded mb-1 mx-auto" />
              <span className="text-white text-xs">Adjust</span>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-700 rounded mb-1 mx-auto" />
              <span className="text-white text-xs">Crop</span>
            </div>
            <div className="text-center">
              <div className="w-6 h-6 bg-gray-700 rounded mb-1 mx-auto" />
              <span className="text-white text-xs">Clean Up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
