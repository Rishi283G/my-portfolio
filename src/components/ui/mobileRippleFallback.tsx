// Standalone touch-only ripple effect for mobile devices
// This can be used as an alternative if needed
const mobileRippleEffect = () => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice) return; // Only execute on touch devices
  
  // Create ripple container if it doesn't exist
  let rippleContainer = document.querySelector('.mobile-ripple-container');
  if (!rippleContainer) {
    rippleContainer = document.createElement('div');
    rippleContainer.className = 'mobile-ripple-container';
    document.body.appendChild(rippleContainer);
  }
  
  // Function to create ripple at touch location
  const createRipple = (x, y) => {
    console.log(`Creating ripple at: ${x}, ${y}`);
    
    const ripple = document.createElement('div');
    ripple.className = 'cursor-click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    rippleContainer.appendChild(ripple);
    
    // Force reflow
    void ripple.offsetWidth;
    
    ripple.classList.add('active');
    
    // Remove after animation completes
    setTimeout(() => {
      if (ripple && ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 700);
  };
  
  // Add event listeners
  document.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      createRipple(touch.clientX, touch.clientY);
    }
  }, { passive: true });
  
  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });
  
  // For debugging
  console.log('Mobile ripple effect initialized');
};

// Call this function after the page loads if you want to use it
// as an alternative to the cursor component
export default mobileRippleEffect;