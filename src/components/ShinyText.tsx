import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
}

/**
 * ShinyText Component
 * Renders text with a continuous sweeping shiny gradient animation.
 *
 * Specifications:
 * - Powered by framer-motion
 * - Base color: #64CEFB (light blue)
 * - Shine color: #ffffff (white)
 * - Animation speed: 3 seconds
 * - Gradient spread: 100 degrees
 * - Sweep: left to right continuously
 * - Uses CSS backgroundClip: text with transparent fill
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  className = '',
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
}) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(100deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['100% 0%', '-100% 0%'],
      }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
};
