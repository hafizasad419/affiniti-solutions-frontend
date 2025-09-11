import { FiUsers, FiDollarSign, FiTrendingUp, FiAward } from 'react-icons/fi';

function SocialProof() {
  const stats = [
    {
      icon: FiUsers,
      number: "100–300",
      label: "C-Level referrals per year"
    },
    {
      icon: FiDollarSign,
      number: "6–7 figure",
      label: "deals closed consistently"
    },
    {
      icon: FiTrendingUp,
      number: "15+ years",
      label: "of executive relationship expertise"
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <FiAward className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Built on 15+ years of executive relationship expertise and tested with top CEOs, 
              DeepTrust AI was designed to help leaders like you:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mb-6 mx-auto">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Build networks that multiply deal flow and enterprise value.
            </h3>
            <p className="text-lg text-gray-600">
              Join the exclusive group of executives who are already transforming their business relationships into systematic growth engines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
