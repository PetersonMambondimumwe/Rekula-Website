import React, { useRef, useEffect, useState } from 'react';

interface MotionBackgroundProps {
  enabled?: boolean;
  className?: string;
  videoUrl?: string;
}

const DEFAULT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

/**
 * MotionBackground Component
 *
 * Full-screen looping video background calibrated for Re:kula's dark navy & cream aesthetic.
 * Embeds with the website's void canvas (#070D14) using multi-layer color grading:
 * 1. Deep midnight-blue atmospheric overlay
 * 2. Radial vignette for maximum typographic legibility
 * 3. Soft top and bottom seamless gradient blends
 *
 * Can be effortlessly enabled/disabled with the `enabled` prop for full client reversibility.
 */
export const MotionBackground: React.FC<MotionBackgroundProps> = ({
  enabled = true,
  className = '',
  videoUrl = DEFAULT_VIDEO_URL,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays silently and inline without user interaction requirement
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay may be deferred by browser power settings; gracefully handle
        console.debug('MotionBackground autoplay deferred:', err?.message || err);
      });
    }
  }, [enabled, videoUrl]);

  if (!enabled) return null;

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-void ${className}`}
      aria-hidden="true"
    >
      {/* 1. Underlying Looping Video Stream */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* 2. Re:kula Dark Blue & Void Color Grading Overlay */}
      {/* Deepens the video highlights to blend with our #070D14 obsidian void and #14304A navy */}
      <div className="absolute inset-0 bg-[#070D14]/65 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D14]/80 via-transparent to-[#070D14]/90" />

      {/* 3. Radial Vignette for Content Focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(7, 13, 20, 0.25) 0%, rgba(7, 13, 20, 0.75) 75%, #070D14 100%)',
        }}
      />

      {/* 4. Top Fade (under the navbar) */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void via-void/60 to-transparent" />

      {/* 5. Bottom Fade (into subsequent page sections) */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void via-void/85 to-transparent" />
    </div>
  );
};
