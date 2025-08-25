import { FiHeart, FiTarget, FiZap, FiShield, FiUsers, FiTrendingUp, FiAward, FiStar } from "react-icons/fi";

interface ManifestoCardProps {
  icon: React.ComponentType<any>;
  title: string;
  content: string | React.ReactNode;
  iconColor: string;
  bgColor?: string;
  borderColor?: string;
}

interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
}

interface ValueCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconColor: string;
}

function ManifestoCard({ icon: Icon, title, content, iconColor, bgColor = "bg-white", borderColor = "border-gray-300" }: ManifestoCardProps) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-2xl hover:shadow-lg transition-shadow p-8`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
          <div className="text-slate-600 leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ quote, author, role }: QuoteCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8">
      <blockquote className="text-lg italic text-slate-700 mb-4 leading-relaxed">
        "{quote}"
      </blockquote>
      <footer className="text-sm text-slate-600">
        <div className="font-semibold">{author}</div>
        {role && <div className="text-slate-500">{role}</div>}
      </footer>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, iconColor }: ValueCardProps) {
  return (
    <div className="text-center hover:shadow-lg transition-shadow border border-gray-300 rounded-lg">
      <div className="p-6">
        <Icon className={`w-10 h-10 ${iconColor} mx-auto mb-4`} />
        <h4 className="text-lg font-semibold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function TrustManifesto() {
  const coreValues = [
    {
      icon: FiHeart,
      title: "Authentic Connection",
      description: "Beats clever conversion every time",
      iconColor: "text-red-600"
    },
    {
      icon: FiTarget,
      title: "Long-term Alignment",
      description: "Beats short-term tactics",
      iconColor: "text-blue-600"
    },
    {
      icon: FiTrendingUp,
      title: "Trust Compounds",
      description: "Faster than capital",
      iconColor: "text-green-600"
    }
  ];

  const services = [
    {
      icon: FiShield,
      title: "Codify Core Identity",
      description: "Relational philosophy and authentic positioning",
      iconColor: "text-purple-600"
    },
    {
      icon: FiZap,
      title: "AI-Powered Systems",
      description: "Model your best human interactions",
      iconColor: "text-cyan-500"
    },
    {
      icon: FiUsers,
      title: "Referral Ecosystems",
      description: "Executive-level networks rooted in value",
      iconColor: "text-orange-600"
    },
    {
      icon: FiAward,
      title: "Aligned Opportunity",
      description: "Transform into a magnet for purpose-driven growth",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 inline-block px-4 py-2 rounded-full">
              Our Foundation
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Trust Manifesto
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              In a fractured world filled with noise, automation, and transactional thinking—we exist to build what matters most: Trust.
            </p>
          </div>
        </div>
      </section>

      {/* Our Why Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Why</h2>
            <p className="text-xl text-slate-600">Re-centering business growth around what truly scales</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <ManifestoCard
              icon={FiHeart}
              title="Deep, Authentic Relationships"
              content="Between people. Between companies. Between purpose and profit. Affiniti Solutions was founded to re-center business growth around what truly scales: Deep, authentic relationships."
              iconColor="text-red-600"
            />
            <ManifestoCard
              icon={FiShield}
              title="Trust as Foundation"
              content="Trust is not a tactic. It's a truth. It's the foundation of all meaningful growth—personally, professionally, and spiritually. When trust is present, speed increases. Resistance disappears. Value flows."
              iconColor="text-blue-600"
            />
          </div>

          <QuoteCard
            quote="Trust can't be faked, forced, or fabricated. It must be designed, nurtured, and protected."
            author="Affiniti Solutions"
            role="Core Philosophy"
          />
        </div>
      </section>

      {/* Our Name & Symbol Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Name, Our Symbol, Our Soul</h2>
            <p className="text-xl text-slate-600">The three-way infinity loop represents eternal harmony</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <ManifestoCard
              icon={FiTarget}
              title="Relationship with Self"
              content="Integrity, purpose, and clarity of identity. The foundation of all meaningful relationships."
              iconColor="text-purple-600"
              bgColor="bg-purple-50"
              borderColor="border-purple-200"
            />
            <ManifestoCard
              icon={FiUsers}
              title="Relationship with Others"
              content="Mutual growth through collaboration, not coercion. Building bridges, not barriers."
              iconColor="text-blue-600"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
            <ManifestoCard
              icon={FiStar}
              title="Relationship with the Divine"
              content="The higher calling that gives all things meaning. Purpose-driven growth and alignment."
              iconColor="text-cyan-600"
              bgColor="bg-cyan-50"
              borderColor="border-cyan-200"
            />
          </div>

          <div className="text-center">
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              This trinity of alignment is not spiritual fluff. It's strategic infrastructure. When these three are mastered, everything flows.
            </p>
          </div>
        </div>
      </section>

      {/* Our Ethos Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Ethos: Trust Over Transaction</h2>
            <p className="text-xl text-slate-600">Relationships before revenue. Natural connection, not forced persuasion.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {coreValues.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                iconColor={value.iconColor}
              />
            ))}
          </div>

          <QuoteCard
            quote="We believe in scalable systems that honor human values, not exploit them."
            author="Affiniti Solutions"
            role="Core Belief"
          />
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Work: Architecting Trust-Based Growth</h2>
            <p className="text-xl text-slate-600">Building infrastructure for relationship-driven businesses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <ValueCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                iconColor={service.iconColor}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-slate-700 max-w-4xl mx-auto mb-8">
              We don't automate empty funnels. We engineer ecosystems of influence—backed by integrity, powered by AI, and aligned to purpose.
            </p>
          </div>
        </div>
      </section>

      {/* Our Invitation Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Invitation</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Join the movement of leaders who know: Trust isn't a nice-to-have. It's a non-negotiable.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">We're not here to help you sell more.</h3>
              <p className="text-lg">We're here to help you build something worthy of being trusted.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Let's restore what the world has lost.</h3>
              <p className="text-lg">Let's scale what truly matters.</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Affiniti Solutions</h3>
            <div className="space-y-2 text-lg">
              <p><strong>Trust.</strong> Designed.</p>
              <p><strong>Connection.</strong> Engineered.</p>
              <p><strong>Growth.</strong> Reimagined.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TrustManifesto;