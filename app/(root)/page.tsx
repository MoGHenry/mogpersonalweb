import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center pt-24 text-white">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-montserrat font-bold mb-6">Welcome to My Portfolio</h1>
        <p className="text-xl max-w-2xl text-center mb-8">This is a sample page to test the navbar with scroll effects.</p>
        <button className="bg-white text-black font-montserrat font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </section>
      
      {/* Additional sections to enable scrolling */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-4xl font-montserrat font-bold mb-6">Section 1</h2>
        <p className="text-xl max-w-2xl text-center">
          Scroll down to see how the navbar changes as you scroll. This section is added to provide enough content to enable scrolling.
        </p>
      </section>
      
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-4xl font-montserrat font-bold mb-6">Section 2</h2>
        <p className="text-xl max-w-2xl text-center">
          Another section to provide more content for scrolling. The navbar should now have a solid background as you have scrolled down the page.
        </p>
      </section>
    </div>
  );
}
