import { FiAlertTriangle, FiTrendingDown, FiX } from 'react-icons/fi';

interface ProblemCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const problemCards: ProblemCard[] = [
  {
    icon: FiTrendingDown,
    title: "Referrals are inconsistent."
  },
  {
    icon: FiX,
    title: "Networks go cold."
  },
  {
    icon: FiAlertTriangle,
    title: "Opportunities slip through the cracks."
  }
];

function ProblemSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <FiAlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Big Problem
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Traditional CRMs and networking tools weren't built for you. They track data, not trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {problemCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl text-left font-bold text-gray-900 mb-3">{card.title}</h3>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
            <p className="text-2xl font-semibold text-gray-800 leading-relaxed">
              Your relationships are your most valuable asset - but until now, there's been{' '}
              <span className="text-red-600 font-bold">No System</span> to map, measure, and grow them at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
