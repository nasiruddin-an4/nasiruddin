import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Play, X } from 'lucide-react';
import Typed from 'typed.js';
import image from '../components/assets/N2.jpg'

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const typedElement = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings: [
        'Full Stack Developer',
        'React Specialist',
        'UI/UX Enthusiast',
        'Problem Solver'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      cursorChar: '|'
    };

    if (typedElement.current) {
      typed.current = new Typed(typedElement.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="container mx-auto lg:flex justify-between">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-400 mb-4">
            Hi, I'm <span className="text-blue-600">Nasir Uddin</span>
          </h1>
          <div className="text-2xl text-gray-400 mb-8 h-12">
            I'm a <span ref={typedElement} className="text-blue-600"></span>
          </div>
          <p className="text-xl text-gray-400 mb-8">
            A passionate developer crafting beautiful and functional web experiences.
            Specialized in React, Node.js, and modern web technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="/john-doe-cv.pdf"
              download
              className="inline-flex items-center px-6 py-3 border-2 border-gray-400 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
            >
              Download CV
              <Download className="ml-2 w-4 h-4" />
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors group relative"
            >
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative flex items-center">
                Watch Video
                <span className="ml-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                  <Play className="w-4 h-4 text-white" />
                </span>
              </span>
            </button>
          </div>
        </div>
        <div>
          <img src={image} alt="" className='w-80 rounded-full lg:-mt-20'/>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/your-video-id?autoplay=1"
                title="Portfolio Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}