import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import EarlyAccessForm from '@/components/EarlyAccess/HeroSection/EarlyAccessForm';

function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <section className="pt-24 pb-16 bg-dark-primary text-white relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>  */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <button
            onClick={openForm}
            className="mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400 text-yellow-900 font-extrabold border-2 border-yellow-300 shadow-lg inline-block px-6 py-2 rounded-full tracking-wide">
              Early Access Program
            </button>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            Unlock the Future of Trust-Driven Growth
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
            Be among the first to experience DeepTrust AI - the world's first Relationship Intelligence System built to transform how executives win business, scale influence, and grow through trust.
            </p>
            
            <div className="w-full max-w-md mx-auto lg:mx-0 mb-8">
              <div className="flex flex-col items-center lg:items-start gap-6">
                <button 
                  className="btn-primary text-lg !px-22 py-4 hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/90 hover:shadow-3xl"
                  onClick={openForm}
                >
                  Get Early Access Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Loom Video */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe 
                  src="https://www.loom.com/embed/8189c9253dbe473aba95925e901c7670?sid=5f4ffec5-570e-424a-b2d8-555bd5598a37&hide_owner=true" 
                  frameBorder="0" 
                  allowFullScreen 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Early Access Form Popup */}
      <EarlyAccessForm isOpen={isFormOpen} onClose={closeForm} />
    </section>
  );
}

export default HeroSection;