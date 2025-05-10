import { useEffect, useRef, useState } from 'react';
import "../customCursor.css";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickRippleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'pointer'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const trailElementsRef = useRef<HTMLDivElement[]>([]);
  const trailCount = 5;
  const trailPositions = useRef<Array<{x: number, y: number}>>([]);
  const magnetStrength = 0.3;
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const lastTrailUpdate = useRef<number>(0);
  const trailUpdateInterval = 40;
  const [lastTapTime, setLastTapTime] = useState(0);
  const touchTimeout = useRef<number | null>(null);

  const getMagnetPosition = (mouseX: number, mouseY: number): { x: number, y: number } => {
    if (!isHovering) return { x: mouseX, y: mouseY };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive');
    let closestElement: Element | null = null;
    let closestDistance = Infinity;
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + 
        Math.pow(mouseY - centerY, 2)
      );
      
      if (distance < 50 && distance < closestDistance) {
        closestDistance = distance;
        closestElement = element;
      }
    });
    
    if (closestElement) {
      const rect = closestElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const strength = Math.max(0, 1 - (closestDistance / 50)) * magnetStrength;
      const pullX = (centerX - mouseX) * strength;
      const pullY = (centerY - mouseY) * strength;
      
      return { 
        x: mouseX + pullX, 
        y: mouseY + pullY 
      };
    }
    
    return { x: mouseX, y: mouseY };
  };

  const animateCursor = () => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;
      
      cursor.style.left = `${cursorPos.current.x}px`;
      cursor.style.top = `${cursorPos.current.y}px`;
      
      const now = Date.now();
      if (now - lastTrailUpdate.current > trailUpdateInterval) {
        trailPositions.current.unshift({ 
          x: cursorPos.current.x, 
          y: cursorPos.current.y 
        });
        
        trailPositions.current = trailPositions.current.slice(0, trailCount);
        
        trailElementsRef.current.forEach((trail, index) => {
          if (trail && trailPositions.current[index]) {
            trail.style.left = `${trailPositions.current[index].x}px`;
            trail.style.top = `${trailPositions.current[index].y}px`;
          }
        });
        
        lastTrailUpdate.current = now;
      }
    }
    
    rafRef.current = requestAnimationFrame(animateCursor);
  };

  const handlePointerDown = (x: number, y: number) => {
    setIsClicking(true);
    
    if (clickRippleRef.current) {
      clickRippleRef.current.style.left = `${x}px`;
      clickRippleRef.current.style.top = `${y}px`;
      clickRippleRef.current.classList.add('active');
      
      setTimeout(() => {
        if (clickRippleRef.current) {
          clickRippleRef.current.classList.remove('active');
        }
      }, 700);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    const now = Date.now();
    if (now - lastTapTime < 300) {
      e.preventDefault();
    }
    setLastTapTime(now);

    const touch = e.touches[0];
    handlePointerDown(touch.clientX, touch.clientY);

    if (touchTimeout.current) clearTimeout(touchTimeout.current);
    touchTimeout.current = window.setTimeout(() => {
      setIsClicking(false);
    }, 200);
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const clickRipple = clickRippleRef.current;
    if (!cursor || !clickRipple) return;

    setIsVisible(true);
    rafRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      const magnetPos = getMagnetPosition(e.clientX, e.clientY);
      mousePos.current = magnetPos;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName.toLowerCase() === 'input' || 
        target.tagName.toLowerCase() === 'textarea' ||
        target.getAttribute('contenteditable') === 'true'
      ) {
        setCursorType('text');
        setIsHovering(false);
        return;
      }
      
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive')
      ) {
        setCursorType('pointer');
        setIsHovering(true);
        return;
      }
      
      setCursorType('default');
      setIsHovering(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      handlePointerDown(e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = `${1 - ((i + 1) * 0.2)}`;
      trail.style.width = `${8 - i}px`;
      trail.style.height = `${8 - i}px`;
      document.body.appendChild(trail);
      trailElementsRef.current.push(trail);
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      
      trailElementsRef.current.forEach(trail => {
        if (trail && trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      
      if (touchTimeout.current) clearTimeout(touchTimeout.current);
    };
  }, [isHovering, lastTapTime]);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`cursor ${isVisible ? 'active' : ''} 
                   ${isHovering ? 'cursor-hover' : ''} 
                   ${isClicking ? 'cursor-clicking' : ''} 
                   cursor-${cursorType}`}
      />
      <div ref={clickRippleRef} className="cursor-click-ripple" />
    </>
  );
};

export default CustomCursor;