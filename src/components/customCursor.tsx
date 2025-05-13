import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import "../customCursor.css";

// Constants for configuration
const CURSOR_CONFIG = {
  TRAIL_COUNT: 5,
  TRAIL_UPDATE_INTERVAL: 40, // ms
  MAGNET_STRENGTH: 0.3,
  MAGNET_DISTANCE: 50, // px
  CURSOR_LERP: 0.2,
  CLICK_RIPPLE_DURATION: 700, // ms
  TOUCH_DEBOUNCE: 300, // ms
} as const;

// Type definitions
interface Position {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickRippleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'pointer'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const trailPositions = useRef<Position[]>([]);
  const mousePos = useRef<Position>({ x: 0, y: 0 });
  const cursorPos = useRef<Position>({ x: 0, y: 0 });
  const lastTrailUpdate = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Get magnetized position for interactive elements
  const getMagnetPosition = (mouseX: number, mouseY: number): Position => {
    if (!isHovering) return { x: mouseX, y: mouseY };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive');
    let closestElement: Element | null = null;
    let closestDistance = Infinity;

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        (mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
      );

      if (distance < CURSOR_CONFIG.MAGNET_DISTANCE && distance < closestDistance) {
        closestDistance = distance;
        closestElement = element;
      }
    });

    if (closestElement) {
      const rect = closestElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const strength = Math.max(0, 1 - closestDistance / CURSOR_CONFIG.MAGNET_DISTANCE) * CURSOR_CONFIG.MAGNET_STRENGTH;
      return {
        x: mouseX + (centerX - mouseX) * strength,
        y: mouseY + (centerY - mouseY) * strength,
      };
    }

    return { x: mouseX, y: mouseY };
  };

  // Animate cursor and trails
  const animateCursor = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * CURSOR_CONFIG.CURSOR_LERP;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * CURSOR_CONFIG.CURSOR_LERP;

    cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;

    const now = Date.now();
    if (now - lastTrailUpdate.current > CURSOR_CONFIG.TRAIL_UPDATE_INTERVAL) {
      trailPositions.current.unshift({ x: cursorPos.current.x, y: cursorPos.current.y });
      trailPositions.current = trailPositions.current.slice(0, CURSOR_CONFIG.TRAIL_COUNT);
      lastTrailUpdate.current = now;
    }

    rafRef.current = requestAnimationFrame(animateCursor);
  };

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (x: number, y: number) => {
    setIsClicking(true);

    if (clickRippleRef.current) {
      clickRippleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      clickRippleRef.current.classList.add('active');

      setTimeout(() => {
        clickRippleRef.current?.classList.remove('active');
        setIsClicking(false);
      }, CURSOR_CONFIG.CLICK_RIPPLE_DURATION);
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const clickRipple = clickRippleRef.current;
    if (!cursor || !clickRipple) return;

    setIsVisible(true);
    rafRef.current = requestAnimationFrame(animateCursor);

    // Throttled mouse move handler
    const handleMouseMove = throttle((e: MouseEvent) => {
      const magnetPos = getMagnetPosition(e.clientX, e.clientY);
      mousePos.current = magnetPos;
    }, 16); // ~60fps

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

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling during touch
      const touch = e.touches[0];
      handlePointerDown(touch.clientX, touch.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleTouchEnd = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      handleMouseMove.cancel(); // Cancel throttled function
      document.body.style.cursor = 'auto';
    };
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${isVisible ? 'active' : ''} ${isHovering ? 'cursor-hover' : ''} ${
          isClicking ? 'cursor-clicking' : ''
        } cursor-${cursorType}`}
      />
      <div ref={clickRippleRef} className="cursor-click-ripple" />
      {Array.from({ length: CURSOR_CONFIG.TRAIL_COUNT }).map((_, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            opacity: 1 - (index + 1) * 0.2,
            width: `${8 - index}px`,
            height: `${8 - index}px`,
            transform: trailPositions.current[index]
              ? `translate3d(${trailPositions.current[index].x}px, ${trailPositions.current[index].y}px, 0)`
              : 'translate3d(0px, 0px, 0)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;