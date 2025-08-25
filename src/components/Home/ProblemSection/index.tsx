interface ProblemCardProps {
    title: string;
    percentage: string;
    subtitle: string;
    description: string;
    impact: string;
    borderColor: string;
    textColor: string;
}

function ProblemCard({ title, percentage, subtitle, description, impact, borderColor, textColor }: ProblemCardProps) {
    return (
        <div className={`hover:shadow-lg transition-shadow border-l-4 ${borderColor} border-y-gray-300  border-y-1 border-r-1 border-r-gray-300 rounded-lg`}>
            <div className="p-6">
                <h3 className={`text-lg font-semibold ${textColor} mb-2`}>{title}</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">{percentage}</div>
                <p className="text-sm text-slate-600 mb-4">{subtitle}</p>
                <p className="text-sm text-slate-600">
                    {description}
                </p>
                <p className={`text-sm font-medium ${textColor} mt-2`}>{impact}</p>
            </div>
        </div>
    );
}

const problemData: ProblemCardProps[] = [
    {
        title: "Plummeting Close Rates",
        percentage: "5%",
        subtitle: "Average cold outreach close rate",
        description: "Average B2B close rates have fallen to just 2-5% for cold outreach, compared to 14.6% for organic search.",
        impact: "20-50x more leads needed for same results",
        borderColor: "border-l-red-500",
        textColor: "text-red-600"
    },
    {
        title: "AI-Powered Competition",
        percentage: "47%",
        subtitle: "Marketers using AI for outreach",
        description: "47% of marketers are leveraging AI in their outreach, creating unprecedented inbox competition.",
        impact: "Traditional strategies increasingly ineffective",
        borderColor: "border-l-orange-500",
        textColor: "text-orange-600"
    },
    {
        title: "Complex Buying Committees",
        percentage: "10.5",
        subtitle: "Average stakeholders in B2B decisions",
        description: "The average B2B buying group now includes 10-11 stakeholders, with 52% including VP-level or above.",
        impact: "Sales cycles extended to 11.5 months",
        borderColor: "border-l-yellow-500",
        textColor: "text-yellow-600"
    },
    {
        title: "Deteriorating Lead Quality",
        percentage: "75%",
        subtitle: "Marketing leads that never convert",
        description: "75% of marketing-generated leads never convert to sales, with massive misalignment between sellers and buyers.",
        impact: "Massive waste in marketing spend",
        borderColor: "border-l-red-600",
        textColor: "text-red-600"
    }
];

function ProblemSection() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        Why settle for declining performance when systematic referrals are proven to work?
                    </h2>
                    <p className="text-xl text-slate-600 mb-8">
                        Join forward-thinking executives discovering the systematic approach to generating 100-1000+ qualified referrals annually without cold outreach.
                    </p>
                    <div className="flex justify-center mb-4">
                        <button
                            className="btn-primary"
                        >
                            Apply to See if You Qualify
                        </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">Beta program • Limited availability</p>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">The Market Reality</h3>
                    <h4 className="text-xl font-semibold text-slate-700 mb-8 text-center">Why Traditional Marketing Is Failing B2B Companies</h4>
                    <p className="text-lg text-slate-600 mb-12 text-center max-w-4xl mx-auto">
                        Today's B2B landscape presents unprecedented challenges that are eroding the effectiveness of conventional approaches.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problemData.map((problem, index) => (
                        <ProblemCard
                            key={index}
                            title={problem.title}
                            percentage={problem.percentage}
                            subtitle={problem.subtitle}
                            description={problem.description}
                            impact={problem.impact}
                            borderColor={problem.borderColor}
                            textColor={problem.textColor}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution Isn't More Cold Outreach</h3>
                    <p className="text-lg text-slate-600">
                        It's building authentic relationships through qualified referrals that bypass these challenges entirely.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ProblemSection