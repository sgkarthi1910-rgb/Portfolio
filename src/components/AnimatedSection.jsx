import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'pop', // 'pop' | 'up' | 'down' | 'left' | 'right'
  scale = 0.90
}) {
  const isPop = direction === 'pop';

  const directions = {
    pop: { y: 40, x: 0, scale },
    up: { y: 40, x: 0, scale: 0.96 },
    down: { y: -40, x: 0, scale: 0.96 },
    left: { x: 40, y: 0, scale: 0.96 },
    right: { x: -40, y: 0, scale: 0.96 }
  };

  const offset = directions[direction] || directions.pop;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...offset
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1
      }}
      viewport={{ once: true, amount: 0.1, margin: '-30px' }}
      transition={{
        duration: isPop ? 0.6 : 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
