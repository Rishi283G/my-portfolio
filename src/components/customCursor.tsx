import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import "../CustomCursor.css";

const CURSOR_CONFIG = {
  TRAIL_COUNT: 12,
  TRAIL_UPDATE_INTERVAL: 10,
  MAGNET_STRENGTH: 0.25,
  MAGNET_DISTANCE: 100,
  CURSOR_LERP: 0.12,
  RIPPLE_DURATION: 800,
  PARTICLE_COUNT: 12,
  TAP_THRESHOLD: 8,
  SIZE_TRANSITION: 0.4,
} as const;

interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'text' | 'pointer' | 'welcome'>('default');
  const [isActive, setIsActive] = useState({ hover: false, click: false });
  
  const mousePos = useRef<Position>({ x: 0, y: 0 });
  const cursorPos = useRef<Position>({ x: 0, y: 0 });
  const trailPositions = useRef<Position[]>([]);
  const lastTrailUpdate = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const touchStartPos = useRef<Position | null>(null);

  // Initialize trail positions
  useEffect(() => {
    trailPositions.current = Array.from({ length: CURSOR_CONFIG.TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
  }, []);

  const createParticles = (x: number, y: number) => {
    if (!particlesRef.current) return;
    
    for (let i = 0; i < CURSOR_CONFIG.PARTICLE_COUNT; i++) {
      const angle = (i * (2 * Math.PI)) / CURSOR_CONFIG.PARTICLE_COUNT;
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.setProperty('--tx', `${Math.cos(angle) * 50}px`);
      particle.style.setProperty('--ty', `${Math.sin(angle) * 50}px`);
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  };

  const showRippleEffect = (x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), CURSOR_CONFIG.RIPPLE_DURATION);
    createParticles(x, y);
  };

  const getMagnetPosition = (mouseX: number, mouseY: number): Position => {
    const elements = document.querySelectorAll('a, button, [role="button"], .interactive, input[type="submit"], input[type="button"], [role="tab"], .cursor-pointer');
    let closestPos = { x: mouseX, y: mouseY };
    let closestDistance: number = CURSOR_CONFIG.MAGNET_DISTANCE;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        const strength = (1 - distance / CURSOR_CONFIG.MAGNET_DISTANCE) * CURSOR_CONFIG.MAGNET_STRENGTH;
        closestPos = {
          x: mouseX + (centerX - mouseX) * strength,
          y: mouseY + (centerY - mouseY) * strength
        };
      }
    });

    return closestPos;
  };

  const animateCursor = () => {
    if (!cursorRef.current) return;

    // Smoothly follow mouse
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * CURSOR_CONFIG.CURSOR_LERP;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * CURSOR_CONFIG.CURSOR_LERP;

    cursorRef.current.style.transform = 
      `translate(-50%, -50%) translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;

    // Update trail
    const now = Date.now();
    if (now - lastTrailUpdate.current > CURSOR_CONFIG.TRAIL_UPDATE_INTERVAL) {
      trailPositions.current.unshift({ ...cursorPos.current });
      trailPositions.current.pop();
      lastTrailUpdate.current = now;
    }

    // Apply trail positions to DOM elements directly
    trailRefs.current.forEach((trail, index) => {
      if (trail && trailPositions.current[index]) {
        const pos = trailPositions.current[index];
        trail.style.transform = `translate(-50%, -50%) translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
    });

    rafRef.current = requestAnimationFrame(animateCursor);
  };

  const handleInteraction = (type: 'start' | 'end', x: number, y: number) => {
    if (type === 'start') {
      setIsActive(prev => ({ ...prev, click: true }));
      // Use the coordinates passed in for exact ripple placement
      showRippleEffect(x, y);
    } else {
      setIsActive(prev => ({ ...prev, click: false }));
    }
  };

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsVisible(false);
      document.body.style.cursor = 'auto';
      return;
    }

    setIsVisible(true);
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = getMagnetPosition(e.clientX, e.clientY);
      
      // If cursor is not yet animated, start it
      if (rafRef.current === null) {
        cursorPos.current = { x: e.clientX, y: e.clientY };
        trailPositions.current = Array.from({ length: CURSOR_CONFIG.TRAIL_COUNT }, () => ({ x: e.clientX, y: e.clientY }));
        rafRef.current = requestAnimationFrame(animateCursor);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const isInteractive = target.closest('a, button, [role="button"], .interactive, [role="tab"], .cursor-pointer');
      const isTextInput = ['input', 'textarea'].includes(tagName) || target.isContentEditable;

      setCursorState(isTextInput ? 'text' : isInteractive ? 'pointer' : 'default');
      setIsActive(prev => ({ ...prev, hover: !!isInteractive }));
    };

    const handleMouseDown = (e: MouseEvent) => handleInteraction('start', e.clientX, e.clientY);
    const handleMouseUp = () => handleInteraction('end', 0, 0);

    const handleTouch = (e: TouchEvent) => {
      if (e.type === 'touchstart' && e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      }
      
      if (e.type === 'touchend' && touchStartPos.current) {
        const touch = e.changedTouches[0];
        const delta = Math.hypot(
          touch.clientX - touchStartPos.current.x,
          touch.clientY - touchStartPos.current.y
        );
        
        if (delta < CURSOR_CONFIG.TAP_THRESHOLD) {
          handleInteraction('start', touch.clientX, touch.clientY);
          setTimeout(() => handleInteraction('end', 0, 0), 200);
        }
        touchStartPos.current = null;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchend', handleTouch);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('touchend', handleTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${isActive.hover ? 'cursor-hover' : ''} ${
          isActive.click ? 'cursor-clicking' : ''
        } cursor-${cursorState}`}
      />
      
      <div ref={particlesRef} className="cursor-particles" />
      
      {Array.from({ length: CURSOR_CONFIG.TRAIL_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={el => (trailRefs.current[index] = el)}
          className="cursor-trail"
          style={{
            opacity: 1 - (index * 0.08),
            width: `${18 - index}px`,
            height: `${18 - index}px`,
            // Set initial position to avoid jump
            transform: `translate(-50%, -50%) translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;