import React from 'react';

interface PhoneMockupProps {
  currentImage: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ currentImage }) => {
  return (
    <div className="relative w-[380px] h-[780px]">
      {/* Simple iPhone frame */}
      <div className="absolute inset-0 bg-black rounded-[45px] border-[14px] border-gray-800 shadow-xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-xl z-10" />
        
        {/* Main image - full screen */}
        <div className="absolute inset-0">
          <img
            src={currentImage}
            alt="Phone content"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
