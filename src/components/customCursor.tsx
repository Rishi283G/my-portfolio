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
  const trailCount = 5; // Number of trailing dots
  const trailPositions = useRef<Array<{x: number, y: number}>>([]);
  const magnetStrength = 0.3; // Adjust magnetic pull (0-1)
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const lastTrailUpdate = useRef<number>(0);
  const trailUpdateInterval = 40; // ms between trail updates

  // Handle magnetism effect for interactive elements
  const getMagnetPosition = (mouseX: number, mouseY: number): { x: number, y: number } => {
    // Skip magnetism if not hovering
    if (!isHovering) return { x: mouseX, y: mouseY };

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive');
    let closestElement: Element | null = null;
    let closestDistance = Infinity;
    
    // Find the closest interactive element
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + 
        Math.pow(mouseY - centerY, 2)
      );
      
      // Magnetism range: 50px
      if (distance < 50 && distance < closestDistance) {
        closestDistance = distance;
        closestElement = element;
      }
    });
    
    if (closestElement) {
      const rect = closestElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate magnetic pull based on distance
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

  // Animate cursor movement using requestAnimationFrame for smoothness
  const animateCursor = () => {
    const cursor = cursorRef.current;
    if (cursor) {
      // Calculate smooth movement using lerp
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.2;
      
      // Apply position
      cursor.style.left = `${cursorPos.current.x}px`;
      cursor.style.top = `${cursorPos.current.y}px`;
      
      // Update trail with throttling
      const now = Date.now();
      if (now - lastTrailUpdate.current > trailUpdateInterval) {
        // Add current position to the start of the array
        trailPositions.current.unshift({ 
          x: cursorPos.current.x, 
          y: cursorPos.current.y 
        });
        
        // Keep only what we need
        trailPositions.current = trailPositions.current.slice(0, trailCount);
        
        // Update trail elements
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

  useEffect(() => {
    const cursor = cursorRef.current;
    const clickRipple = clickRippleRef.current;
    if (!cursor || !clickRipple) return;

    // Show cursor after component mounts
    setIsVisible(true);
    
    // Start animation loop
    rafRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      // Apply magnetism and store mouse position
      const magnetPos = getMagnetPosition(e.clientX, e.clientY);
      mousePos.current = magnetPos;
    };

    // Check if element is interactive
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for text input fields
      if (
        target.tagName.toLowerCase() === 'input' || 
        target.tagName.toLowerCase() === 'textarea' ||
        target.getAttribute('contenteditable') === 'true'
      ) {
        setCursorType('text');
        setIsHovering(false);
        return;
      }
      
      // Check for interactive elements
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
      
      // Default state
      setCursorType('default');
      setIsHovering(false);
    };

    // Handle mouse click effect
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Position and show click ripple
      if (clickRipple) {
        clickRipple.style.left = `${e.clientX}px`;
        clickRipple.style.top = `${e.clientY}px`;
        clickRipple.classList.add('active');
        
        // Remove active class after animation completes
        setTimeout(() => {
          clickRipple.classList.remove('active');
        }, 700); // Match animation duration
      }
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Hide real cursor when mouse enters the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Show real cursor when mouse leaves the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Create trail elements
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
      // Cancel animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up trail elements
      trailElementsRef.current.forEach(trail => {
        if (trail && trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
    };
  }, [isHovering]);

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