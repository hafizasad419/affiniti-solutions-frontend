interface ProgramCardProps {
    title: string;
    format: string;
    formatBgColor: string;
    formatTextColor: string;
    description: string;
    target: string;
    isPopular?: boolean;
}

const programsData: ProgramCardProps[] = [
    {
        title: "DeepTrust OS Accelerator",
        format: "Mastermind Format",
        formatBgColor: "bg-blue-100",
        formatTextColor: "text-blue-700",
        description: "Join our group of fellow peers and learn to install the operating system yourself. Perfect for companies ready to build their own DeepTrust networks.",
        target: "Target: 50-100 referrals annually"
    },
    {
        title: "DeepTrust OS Catalyst",
        format: "2-Day Sprint Workshop",
        formatBgColor: "bg-cyan-100",
        formatTextColor: "text-cyan-700",
        description: "We come in for an intensive workshop and build your entire infrastructure within a week. Fast implementation with immediate results.",
        target: "Target: 100-300 referrals annually",
        isPopular: true
    },
    {
        title: "DeepTrust OS Sovereign",
        format: "Full-Service Implementation",
        formatBgColor: "bg-purple-100",
        formatTextColor: "text-purple-700",
        description: "Our team builds, runs, and manages your entire DeepTrust network for the first year. Complete done-for-you solution.",
        target: "Target: 500-1000+ referrals annually"
    }
];

function ProgramCard({ title, format, formatBgColor, formatTextColor, description, target, isPopular }: ProgramCardProps) {
    return (
        <div className={`rounded-2xl hover:shadow-lg transition-shadow border-gray-300 border ${isPopular ? 'border-2 border-cyan-400 relative' : ''}`}>
            {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-1 rounded-full">
                    Most Popular
                </div>
            )}
            <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
                <div className={`mb-4 rounded-full inline-block px-4 py-1 ${formatBgColor} ${formatTextColor}`}>{format}</div>
                <p className="text-slate-600 mb-6">{description}</p>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-lg mb-6">
                    <div className="font-semibold">{target}</div>
                </div>
            </div>
        </div>
    );
}

function Programs() {
    return (
        <section id="programs" className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your DeepTrust OS Implementation</h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {programsData.map((program, index) => (
                        <ProgramCard key={index} {...program} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Programs