import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="my-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Testimonials</h2>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-white">"Rishi has shown exceptional growth in web development. His dedication to learning and problem-solving stands out."</p>
          <p className="text-gray-400 mt-4 text-right">- Prof. Ajay Shinde</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-white">"Working with Rishi on a recent project was smooth and insightful. He has clean code practices and a great attitude."</p>
          <p className="text-gray-400 mt-4 text-right">- Vishal Patil</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-white">"I'm on a journey to turn my code into meaningful solutions and my passion into a career. Every day, I'm building better."</p>
          <p className="text-gray-400 mt-4 text-right">- Rishi Jadhav</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
