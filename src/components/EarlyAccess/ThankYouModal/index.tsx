import { FiX, FiUsers, FiGift, FiCheckCircle } from 'react-icons/fi';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Welcome to DeepTrust AI!</h2>
              <p className="text-xs text-gray-600">Early Access</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Success Message */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiGift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎉 You're In!
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Thank you for joining! We'll be in touch within 24 hours.
            </p>
          </div>

          {/* Referral Bonus */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiUsers className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1 text-sm">
                  🚀 Unlock 2 Months Free Trial
                </h4>
                <p className="text-gray-700 text-xs leading-relaxed">
                  Refer 5 friends and get <span className="font-semibold text-blue-600">2 months free</span> instead of 1!
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-4 space-y-2">
            <h5 className="font-semibold text-gray-900 text-xs">What happens next?</h5>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Check your email for access details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouModal;
