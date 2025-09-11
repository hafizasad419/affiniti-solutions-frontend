import { useState } from 'react';
import { FiArrowRight, FiLock, FiClock } from 'react-icons/fi';
import EarlyAccessForm from '@/components/EarlyAccess/HeroSection/EarlyAccessForm';

function CallToAction() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <section className="py-20 bg-dark-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Be the First to Build With Trust.
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              DeepTrust AI is opening its doors to a limited group of forward-thinking executives.
              Secure your spot today.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 mb-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-xl mb-4 mx-auto">
                  <FiLock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Exclusive Access</h3>
                <p className="text-sm text-slate-300">Limited spots available</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl mb-4 mx-auto">
                  <FiClock className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Trial</h3>
                <p className="text-sm text-slate-300">Full platform access</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-4 mx-auto">
                  <FiArrowRight className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">First Mover</h3>
                <p className="text-sm text-slate-300">Competitive advantage</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="btn-primary text-xl px-12 py-5 mb-6"
                onClick={openForm}
              >
                Fill out the form now to claim your free trial
                <FiArrowRight className="ml-3 w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-slate-400">
              No credit card required
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg text-slate-300">
              Join the revolution in relationship intelligence. Your network is waiting.
            </p>
          </div>
        </div>
      </div>

      {/* Early Access Form Popup */}
      <EarlyAccessForm isOpen={isFormOpen} onClose={closeForm} />
    </section>
  );
}

export default CallToAction;
