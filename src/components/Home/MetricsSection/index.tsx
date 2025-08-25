interface MetricCardProps {
    value: string;
    title: string;
    description: string;
    color: string;
}

function MetricCard({ value, title, description, color }: MetricCardProps) {
    return (
        <div className="text-center hover:shadow-lg transition-shadow border-1 border-gray-300 rounded-2xl">
            <div className="p-8">
                <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
                <h3 className="!text-3xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600">{description}</p>
            </div>
        </div>
    );
}

const metricsData = [
    {
        value: "30-50%",
        title: "Higher Conversion",
        description: "vs traditional outreach",
        color: "text-blue-600"
    },
    {
        value: "25-40%",
        title: "Shorter Sales Cycles",
        description: "Faster revenue realization",
        color: "text-cyan-500"
    },
    {
        value: "40-60%",
        title: "Lower Acquisition Costs",
        description: "Maximum ROI efficiency",
        color: "text-green-600"
    },
    {
        value: "100-1000+",
        title: "Annual Referrals",
        description: "Systematic generation",
        color: "text-purple-600"
    }
];

function MetricsSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-bold text-slate-900 mb-4">Proven Performance Metrics</h2>
                    <p className="text-xl text-slate-600">Real results from enterprise implementations</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metricsData.map((metric, index) => (
                        <MetricCard
                            key={index}
                            value={metric.value}
                            title={metric.title}
                            description={metric.description}
                            color={metric.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MetricsSection