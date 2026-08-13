'use client';

import { useState, useRef, useEffect } from 'react';

export function TickerText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const updateDistance = () => {
      if (containerRef.current && textRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const tWidth = textRef.current.scrollWidth;
        if (tWidth > cWidth) {
          setScrollDistance(tWidth - cWidth);
        } else {
          setScrollDistance(0);
        }
      }
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, [text]);

  const speedPxPerSec = 40; // velocidade do deslize
  const duration = scrollDistance > 0 ? scrollDistance / speedPxPerSec : 0;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full select-none ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${scrollDistance > 0 && !hover ? 'truncate max-w-full block' : ''}`}
        style={{
          transform: hover && scrollDistance > 0 ? `translateX(-${scrollDistance + 10}px)` : 'translateX(0)',
          transition: hover && scrollDistance > 0 ? `transform ${duration}s linear` : 'transform 0.3s ease-out',
        }}
        title={text}
      >
        {text}
      </span>
    </div>
  );
}
