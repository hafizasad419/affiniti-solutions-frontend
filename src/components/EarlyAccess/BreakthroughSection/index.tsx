import { FiZap, FiHeart, FiGlobe } from 'react-icons/fi';   
import { FaBrain } from 'react-icons/fa';

function BreakthroughSection() {
  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Trust Mapping",
      description: "Identify your strongest paths to influence and opportunity."
    },
    {
      icon: FiZap,
      title: "Smart Engagement Triggers",
      description: "Know the perfect time to reach out and what to say."
    },
    {
      icon: FiHeart,
      title: "Network Warmth Engine",
      description: "Keep every key relationship alive and thriving without effort."
    },
    {
      icon: FiGlobe,
      title: "Cultural & Personal Sensitivity",
      description: "Communicate in ways that build real trust across every relationship."
    }
  ];

  return (
    <section className="py-20 bg-dark-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            The Breakthrough
          </h2>
          <p className="text-2xl text-cyan-300 font-semibold mb-12">
            DeepTrust AI changes everything.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-lg text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-10">
            <p className="text-xl font-semibold mb-2">This is not another CRM.</p>
            <p className="text-2xl font-bold">This is your Relationship Intelligence System.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BreakthroughSection;
