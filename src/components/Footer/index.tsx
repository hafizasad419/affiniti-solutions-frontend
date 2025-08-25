import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement, scrollToTop } from '@/utils/scroll';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home with hash
      navigate(`/#${sectionId}`);
    } else {
      // Already on home page, just scroll
      scrollToElement(sectionId);
    }
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/natekievman/ai-accelerator-exploratory-call', '_blank');
    console.log('Schedule Discovery Call clicked');
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-bold mb-4 text-cyan-400">Affiniti Solutions</h3>
          <p className="text-slate-300">
            Transforming enterprise sales through systematic referral generation and AI-powered relationship intelligence.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
          <div className="space-y-2">
            <button onClick={() => handleScrollToSection('how-it-works')} className="block text-slate-300 hover:text-cyan-400">
              How It Works
            </button>
            <button onClick={() => handleScrollToSection('programs')} className="block text-slate-300 hover:text-cyan-400">
              Programs
            </button>
            <button onClick={() => handleScrollToSection('impact-analysis')} className="block text-slate-300 hover:text-cyan-400">
              Impact Analysis
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact</h3>
          <p className="text-slate-300 mb-2">Ready to get started?</p>
          <button onClick={handleScheduleCall} className="text-cyan-400 hover:text-cyan-300">
            Schedule Discovery Call
          </button>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} Affiniti Solutions. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer