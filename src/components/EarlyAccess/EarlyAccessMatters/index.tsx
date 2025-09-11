import { FiCheck, FiStar, FiTrendingUp } from 'react-icons/fi';

function EarlyAccessMatters() {
  const benefits = [
    {
      icon: FiStar,
      text: "Get free trial access before the public launch."
    },
    {
      icon: FiCheck,
      text: "Shape the future of the platform with your feedback."
    },
    {
      icon: FiTrendingUp,
      text: "Gain an unfair advantage in your market by systematizing trust before anyone else."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Early Access Matters
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            By joining early, you'll:
          </p>

          <div className="grid gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-6 bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl flex-shrink-0">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                    <benefit.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-xl font-semibold text-gray-800 text-left">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-4">Limited Time Opportunity</h3>
            <p className="text-lg opacity-90">
              Early access spots are limited to ensure quality feedback and optimal user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EarlyAccessMatters;
