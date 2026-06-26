import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/src/vanta.globe'; // Import GLOBE instead of NET

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Force cleanup of any previous effects
    if (vantaEffect) {
      vantaEffect.destroy();
    }

    // Initialize GLOBE
    const effect = GLOBE({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff3e3e,
      color2: 0xff3e3e,
      backgroundColor: 0x0a192f,
      size: 1.10 
    });

    setVantaEffect(effect);

    return () => {
      if (effect) effect.destroy();
    };
  }, []); // Run once on mount

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10 w-full h-full"
    >
      {/* 
         DARK OVERLAY:
         The Globe can be quite bright. This overlay ensures your 
         content (Hero text) is the main focus.
      */}
      <div className="absolute inset-0 bg-primary/40 pointer-events-none"></div>
    </div>
  );
};

export default VantaBackground;