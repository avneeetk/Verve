
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  element: HTMLDivElement;
}

const BackgroundParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles: Particle[] = [];
    const particleCount = 25; // Adjust based on preference

    // Clear any existing particles
    container.innerHTML = '';

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speedX = (Math.random() - 0.5) * 0.3;
      const speedY = (Math.random() - 0.5) * 0.3;
      const opacity = Math.random() * 0.3 + 0.1;

      const element = document.createElement('div');
      element.classList.add('particle');
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity.toString();
      
      // Randomly assign colors
      const colorRandom = Math.random();
      if (colorRandom < 0.33) {
        element.style.backgroundColor = '#00F0FF'; // Teal
        element.style.boxShadow = '0 0 6px 1px rgba(0, 240, 255, 0.5)';
      } else if (colorRandom < 0.66) {
        element.style.backgroundColor = '#B98EFF'; // Lilac
        element.style.boxShadow = '0 0 6px 1px rgba(185, 142, 255, 0.5)';
      } else {
        element.style.backgroundColor = '#FF4081'; // Pink
        element.style.boxShadow = '0 0 6px 1px rgba(255, 64, 129, 0.5)';
      }
      
      container.appendChild(element);
      
      particles.push({ x, y, size, speedX, speedY, opacity, element });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animate = () => {
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Loop particles around the screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Update particle position
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default BackgroundParticles;
