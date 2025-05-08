import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  // Sample testimonial data - you can replace with your actual data
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

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigate to specific testimonial
  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'}`}

        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-white text-gray-900 transition-colors duration-500">

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Client Testimonials</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 transition-colors duration-500"></p>

        </div>

        <div className="relative">
          {/* Main testimonial card */}
       <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-10 shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-500">

            <div className="flex justify-center mb-6 space-x-1">
              {renderStars(testimonials[currentIndex].rating)}
            </div>
            
            <div className="relative">
              <svg className="text-blue-500 w-12 h-12 opacity-20 absolute -top-6 -left-2" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-6.4c0-1.1-.9-1.6-2-1.6h-2c-1.1 0-2-.5-2-1.6V10c0-1.1-.9-2-2-2h-6zm16-8c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4v-6.4c0-1.1-.9-1.6-2-1.6h-2c-1.1 0-2-.5-2-1.6V2c0-1.1-.9-2-2-2h-6z" />
              </svg>
              
              <p className="text-lg md:text-xl italic leading-relaxed">
                {testimonials[currentIndex].text}
              </p>
              
              <svg className="text-blue-500 w-12 h-12 opacity-20 absolute -bottom-6 -right-2" fill="currentColor" viewBox="0 0 32 32">
                <path d="M22 24c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4H12c-2.2 0-4 1.8-4 4v6.4c0 1.1.9 1.6 2 1.6h2c1.1 0 2 .5 2 1.6V22c0 1.1.9 2 2 2h6zM6 32c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4H-4c-2.2 0-4 1.8-4 4v6.4c0 1.1.9 1.6 2 1.6h2c1.1 0 2 .5 2 1.6V30c0 1.1.9 2 2 2h6z" />
              </svg>
            </div>
            
            <div className="mt-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-bold">
                {testimonials[currentIndex].author.charAt(0)}
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-xl">{testimonials[currentIndex].author}</h4>
                <p className="text-blue-400 text-sm">{testimonials[currentIndex].source}</p>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? "bg-blue-500 w-6" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:block">
            <button 
              onClick={() => setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
              className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 rounded-full p-2 focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;