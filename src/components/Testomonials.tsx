import React, { useState, useEffect, useRef } from 'react';
import { AnimationWrapper, StaggerContainer } from "./anime";

const Testimonials = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      text: "Vendor very professional, provided all the help I needed. Went overboard to provide me with a detailed solution to my problems. Would do business with again. Highly skilled in providing a service solution to my client base.",
      author: "Sashabeanie",
      source: "Fiverr Verified Client",
      rating: 5
    },
    {
      id: 2,
      text: "Exceptional service! The attention to detail was remarkable. Everything was delivered on time and exactly as promised.",
      author: "JamesDoe",
      source: "Upwork Client",
      rating: 5
    },
    {
      id: 3,
      text: "A true professional who understands client needs and delivers quality work. Communication was excellent throughout the project.",
      author: "TechBusiness",
      source: "Freelancer.com",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
  const slideRef = useRef(null);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleTransitionStart('auto');
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length, isTransitioning]);

  // Handle transition states
  const handleTransitionStart = (direction = null) => {
    setIsTransitioning(true);
    setSwipeDirection(direction);
    setTimeout(() => {
      setIsTransitioning(false);
      setSwipeDirection(null);
    }, 500);
  };

  // Navigate to specific testimonial
  const goToTestimonial = (index) => {
    if (currentIndex !== index && !isTransitioning) {
      const direction = index > currentIndex ? 'left' : 'right';
      handleTransitionStart(direction);
      setCurrentIndex(index);
    }
  };

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isTransitioning) {
      if (touchStart - touchEnd > 75) {
        // Swipe left
        handleTransitionStart('left');
        setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
      }
      
      if (touchEnd - touchStart > 75) {
        // Swipe right
        handleTransitionStart('right');
        setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
      }
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-purple-500' : 'text-gray-700'}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Get slide animation class based on direction
  const getSlideAnimation = () => {
    if (!swipeDirection) return '';
    
    if (swipeDirection === 'left') {
      return isTransitioning ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100';
    } else if (swipeDirection === 'right') {
      return isTransitioning ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100';
    } else {
      return isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100';
    }
  };

  return (
    <section id="testimonials" className="py-16 bg-black text-white transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <AnimationWrapper direction='up'>
            <h2 className="text-4xl font-bold mb-2">Client <span className="gradient-text">Testimonials</span></h2>
            <div className="w-24 h-1 bg-purple-700 mx-auto"></div>
            <p className="mt-4 text-gray-400">
              What clients are saying about my work
            </p>
          </AnimationWrapper>
        </div>

        <AnimationWrapper direction='up'>
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile swipe indicator */}
            <div className="md:hidden flex justify-center mb-6">
              <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full space-x-2 border border-gray-800">
                <svg className="w-5 h-5 text-purple-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm text-gray-300">Swipe to navigate</span>
                <svg className="w-5 h-5 text-purple-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Main testimonial card */}
            <div 
              ref={slideRef}
              className={`bg-gray-900 rounded-xl p-8 md:p-10 shadow-2xl border border-gray-800 transition-all duration-500 transform ${getSlideAnimation()}`}
              style={{
                boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.05)',
              }}
            >
              <AnimationWrapper direction='up'>
                <div className="flex justify-center mb-6 space-x-1">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </AnimationWrapper>
              <div className="relative">
                <svg className="text-purple-600 w-10 h-10 opacity-20 absolute -top-6 -left-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-6.4c0-1.1-.9-1.6-2-1.6h-2c-1.1 0-2-.5-2-1.6V10c0-1.1-.9-2-2-2h-6zm16-8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-6.4c0-1.1-.9-1.6-2-1.6h-2c-1.1 0-2-.5-2-1.6V2c0-1.1-.9-2-2-2h-6z" />
                </svg>
                <AnimationWrapper direction='up'>
                  <p className="text-lg md:text-xl italic leading-relaxed text-gray-300">
                    {testimonials[currentIndex].text}
                  </p>
                </AnimationWrapper>
                <svg className="text-purple-600 w-10 h-10 opacity-20 absolute -bottom-6 -right-2" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M22 24c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4H12c-2.2 0-4 1.8-4 4v6.4c0 1.1.9 1.6 2 1.6h2c1.1 0 2 .5 2 1.6V22c0 1.1.9 2 2 2h6zM6 32c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4H-4c-2.2 0-4 1.8-4 4v6.4c0 1.1.9 1.6 2 1.6h2c1.1 0 2 .5 2 1.6V30c0 1.1.9 2 2 2h6z" />
                </svg>
              </div>
              <AnimationWrapper direction='up'>
                <div className="mt-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {testimonials[currentIndex].author.charAt(0)}
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-xl text-white">{testimonials[currentIndex].author}</h4>
                    <p className="text-purple-400 text-sm font-medium">{testimonials[currentIndex].source}</p>
                  </div>
                </div>
              </AnimationWrapper>
            </div>

            {/* Navigation dots - enhanced for mobile */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all transform ${
                    currentIndex === index 
                      ? "bg-purple-600 w-8 scale-110" 
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows - enhanced for desktop */}
            <div className="hidden md:block">
              <button 
                onClick={() => {
                  if (!isTransitioning) {
                    handleTransitionStart('right');
                    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
                  }
                }}
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-900 hover:bg-purple-600 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg border border-gray-800"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  if (!isTransitioning) {
                    handleTransitionStart('left');
                    setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
                  }
                }}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-900 hover:bg-purple-600 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow-lg border border-gray-800"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>   
  );
};    

export default Testimonials;