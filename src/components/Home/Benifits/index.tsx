import { FiBarChart, FiDollarSign, FiShield, FiTarget, FiTrendingUp, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

interface BenefitCardProps {
    icon: IconType;
    title: string;
    description: string;
    iconColor: string;
}

interface Benefit {
    icon: IconType;
    title: string;
    description: string;
    iconColor: string;
}

function BenefitCard({ icon: Icon, title, description, iconColor }: BenefitCardProps) {
    return (
        <div className="text-center hover:shadow-lg transition-shadow border border-gray-300 rounded-lg">
            <div className="p-8">
                <Icon className={`w-12 h-12 ${iconColor} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </div>
        </div>
    );
}

function Benifits() {
    const benefits: Benefit[] = [
        {
            icon: FiTarget,
            title: "Predictable Results",
            description: "Systematic approach delivers consistent referral flow year over year",
            iconColor: "text-blue-600"
        },
        {
            icon: FiZap,
            title: "Faster Sales Cycles",
            description: "Trust transfer accelerates decision-making and reduces friction",
            iconColor: "text-cyan-500"
        },
        {
            icon: FiDollarSign,
            title: "Higher Deal Values",
            description: "Access to enterprise opportunities through network connections",
            iconColor: "text-green-600"
        },
        {
            icon: FiBarChart,
            title: "AI-Powered Intelligence",
            description: "Network analyzer identifies optimal referral opportunities",
            iconColor: "text-purple-600"
        },
        {
            icon: FiTrendingUp,
            title: "Scalable Growth",
            description: "System grows with your business and compounds over time",
            iconColor: "text-orange-600"
        },
        {
            icon: FiShield,
            title: "Competitive Advantage",
            description: "Deep trust networks lead to relationships that create sustainable competitive advantages",
            iconColor: "text-red-600"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">The DeepTrust Advantage</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={index}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            iconColor={benefit.iconColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Benifits;