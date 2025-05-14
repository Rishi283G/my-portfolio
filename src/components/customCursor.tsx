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
  TAP_THRESHOLD: 10, // px (max movement for a tap)
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
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'pointer' | 'welcome'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const trailPositions = useRef<Position[]>([]);
  const mousePos = useRef<Position>({ x: 0, y: 0 });
  const cursorPos = useRef<Position>({ x: 0, y: 0 });
  const lastTrailUpdate = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const touchStartPos = useRef<Position | null>(null);
  const isTouching = useRef(false);

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
      const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

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

    cursor.style.transform = `translate(-50%, -50%) translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;

    const now = Date.now();
    if (now - lastTrailUpdate.current > CURSOR_CONFIG.TRAIL_UPDATE_INTERVAL) {
      trailPositions.current.unshift({ x: cursorPos.current.x, y: cursorPos.current.y });
      trailPositions.current = trailPositions.current.slice(0, CURSOR_CONFIG.TRAIL_COUNT);
      lastTrailUpdate.current = now;
    }

    rafRef.current = requestAnimationFrame(animateCursor);
  };

  // Handle pointer down (mouse or tap)
  const handlePointerDown = (x: number, y: number) => {
    setIsClicking(true);

    if (clickRippleRef.current) {
      // Position exactly at click/tap location
      clickRippleRef.current.style.left = `${x}px`;
      clickRippleRef.current.style.top = `${y}px`;
      
      // Reset animation
      clickRippleRef.current.classList.remove('active');
      // Force reflow
      void clickRippleRef.current.offsetWidth;
      clickRippleRef.current.classList.add('active');

      setTimeout(() => {
        if (clickRippleRef.current) {
          clickRippleRef.current.classList.remove('active');
          setIsClicking(false);
        }
      }, CURSOR_CONFIG.CLICK_RIPPLE_DURATION);
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const clickRipple = clickRippleRef.current;
    if (!cursor || !clickRipple) return;

    // Check if on touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Initialize cursor based on device type
    if (isTouchDevice) {
      setIsVisible(false);
      document.body.style.cursor = 'auto';
    } else {
      setIsVisible(true);
      rafRef.current = requestAnimationFrame(animateCursor);
      document.body.style.cursor = 'none';
    }

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
        setCursorType(target.classList.contains('welcome') ? 'welcome' : 'pointer');
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
      if (e.touches.length !== 1) return; // Ignore multi-touch
      const touch = e.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      isTouching.current = true;
      
      // For debugging - add a console log to verify touch coordinates
      console.log(`Touch start at: ${touch.clientX}, ${touch.clientY}`);
    };

    const handleTouchMove = throttle((e: TouchEvent) => {
      if (!isTouching.current || !touchStartPos.current) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);

      // If movement exceeds tap threshold, treat as swipe (allow scrolling)
      if (deltaX > CURSOR_CONFIG.TAP_THRESHOLD || deltaY > CURSOR_CONFIG.TAP_THRESHOLD) {
        isTouching.current = false;
        touchStartPos.current = null;
      }
    }, 16);

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTouching.current && touchStartPos.current && e.changedTouches.length > 0) {
        // Only trigger tap if minimal movement occurred
        const touch = e.changedTouches[0];
        const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
        const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
        
        if (deltaX <= CURSOR_CONFIG.TAP_THRESHOLD && deltaY <= CURSOR_CONFIG.TAP_THRESHOLD) {
          // It's a tap, show ripple effect
          console.log(`Touch end/tap at: ${touch.clientX}, ${touch.clientY}`);
          handlePointerDown(touch.clientX, touch.clientY);
        }
      }
      
      isTouching.current = false;
      touchStartPos.current = null;
    };

    // Specifically handle clicks for mobile
    const handleClick = (e: MouseEvent) => {
      if (isTouchDevice) {
        handlePointerDown(e.clientX, e.clientY);
      }
    };

    const handleMouseEnter = () => !isTouchDevice && setIsVisible(true);
    const handleMouseLeave = () => !isTouchDevice && setIsVisible(false);

    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    } else {
      // For touch devices, we want the ripple but not the cursor
      document.addEventListener('click', handleClick);
    }
    
    // Touch events for all devices
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    // Specifically for mobile ripple effect - direct tap handler
    if (isTouchDevice) {
      // Listen for tap events directly
      document.addEventListener('click', (e) => {
        console.log(`Click detected at: ${e.clientX}, ${e.clientY}`);
        handlePointerDown(e.clientX, e.clientY);
      });
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);

      handleMouseMove.cancel();
      handleTouchMove.cancel();
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
              ? `translate(-50%, -50%) translate3d(${trailPositions.current[index].x}px, ${trailPositions.current[index].y}px, 0)`
              : 'translate(-50%, -50%) translate3d(0px, 0px, 0)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;