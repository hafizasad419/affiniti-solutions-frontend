import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiTrendingUp, FiTarget, FiZap, FiDollarSign, FiUsers, FiClock, FiDownload, FiShield, FiBarChart } from 'react-icons/fi';
import { generatePDF } from './pdf';

// Custom Card Components
const Card = ({ children, className = '', ...props }: any) => (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`} {...props}>
        {children}
    </div>
);

const CardHeader = ({ children, className = '', ...props }: any) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ children, className = '', ...props }: any) => (
    <h3 className={`text-xl font-bold mb-2 ${className}`} {...props}>
        {children}
    </h3>
);

const CardContent = ({ children, className = '', ...props }: any) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
);

// Custom Slider Component
const Slider = ({ value, onValueChange, min, max, step, className = '', ...props }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = [parseInt(e.target.value)];
        onValueChange(newValue);
    };

    return (
        <div className={`w-full ${className}`} {...props}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[0]}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value[0] - min) / (max - min)) * 100}%, #e5e7eb ${((value[0] - min) / (max - min)) * 100}%, #e5e7eb 100%)`
                }}
            />
        </div>
    );
};

// Custom Dialog Components
const Dialog = ({ children, open, onOpenChange }: any) => {
    if (!open) return null;
    
    return createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => onOpenChange(false)} />
            <div className="relative z-[1000000]">
                {children}
            </div>
        </div>,
        document.body
    );
};



const DialogContent = ({ children, className = '', ...props }: any) => (
    <div className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${className}`} {...props}>
        {children}
    </div>
);

const DialogHeader = ({ children, className = '', ...props }: any) => (
    <div className={className} {...props}>
        {children}
    </div>
);

const DialogTitle = ({ children, className = '', ...props }: any) => (
    <h2 className={`text-2xl font-bold ${className}`} {...props}>
        {children}
    </h2>
);

export const scenarios = {
    conservative: {
        closeRate: 30,
        cycleImprovement: 30,
        dealIncrease: 10,
        label: 'Conservative',
        icon: FiShield,
        description: 'Measured growth with proven results'
    },
    balanced: {
        closeRate: 50,
        cycleImprovement: 40,
        dealIncrease: 25,
        label: 'Balanced',
        icon: FiTarget,
        description: 'Optimal balance of growth and risk'
    },
    aggressive: {
        closeRate: 70,
        cycleImprovement: 50,
        dealIncrease: 50,
        label: 'Aggressive',
        icon: FiTrendingUp,
        description: 'Maximum growth potential'
    }
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
};

const ImpactAnalysis = () => {
    const [scenario, setScenario] = useState('balanced');
    const [metrics, setMetrics] = useState({
        currentLeads: [500],
        currentConversionRate: [8],
        currentSalesCycle: [6],
        currentDealSize: [75000]
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadData, setLeadData] = useState({
        name: '',
        title: '',
        email: '',
        mobile: '',
        company: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const calculateResults = () => {
        const currentLeads = metrics.currentLeads[0];
        const currentConversionRate = metrics.currentConversionRate[0];
        const currentSalesCycle = metrics.currentSalesCycle[0];
        const currentDealSize = metrics.currentDealSize[0];

        const currentDeals = Math.round((currentLeads * currentConversionRate) / 100);
        const currentRevenue = currentDeals * currentDealSize;

        const scenarioData = (scenarios as any)[scenario];
        const deepTrustCloseRate = scenarioData.closeRate;
        const deepTrustCycle = Math.max(1, Math.round(currentSalesCycle * (1 - scenarioData.cycleImprovement / 100)));
        const deepTrustDealSize = Math.round(currentDealSize * (1 + scenarioData.dealIncrease / 100));

        const deepTrustDeals = Math.round((currentLeads * deepTrustCloseRate) / 100);
        const deepTrustRevenue = deepTrustDeals * deepTrustDealSize;

        const revenueImpact = deepTrustRevenue - currentRevenue;
        const dealsImpact = deepTrustDeals - currentDeals;
        const cycleImpact = currentSalesCycle - deepTrustCycle;
        const roiPercentage = currentRevenue > 0 ? Math.round((revenueImpact / currentRevenue) * 100) : 0;

        return {
            current: { deals: currentDeals, revenue: currentRevenue },
            deepTrust: {
                deals: deepTrustDeals,
                revenue: deepTrustRevenue,
                closeRate: deepTrustCloseRate,
                cycle: deepTrustCycle,
                dealSize: deepTrustDealSize
            },
            impact: {
                revenue: revenueImpact,
                deals: dealsImpact,
                cycle: cycleImpact,
                roi: roiPercentage
            }
        };
    };

    const results = calculateResults();


    return (
        <div
            id="impact-analysis"
            className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header Section */}
            <div
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                    <div
                        className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8 shadow-lg"
                    >
                        <FiBarChart className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-blue-900">Executive Impact Analysis</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                        Quantify Your DeepTrust Impact
                    </h1>

                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                        Sophisticated financial modeling that demonstrates the precise ROI of implementing
                        <span className="font-semibold text-gray-800"> DeepTrust OS+AI</span> in your enterprise organization.
                    </p>

                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            Board-Ready Analysis
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                            Executive Summary
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                            Instant PDF Report
                        </div>
                    </div>
                </div>
            </div>

            {/* Scenario Selection */}
            <div
                className="max-w-7xl mx-auto px-6 mb-16"
            >
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Select Your Strategic Scenario</h3>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Choose the projection model that aligns with your organization's risk tolerance and growth objectives.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {Object.entries(scenarios).map(([key, scenarioData]) => {
                            const IconComponent = scenarioData.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setScenario(key)}
                                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${scenario === key
                                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                                        }`}
                                >
                                    <IconComponent className={`w-8 h-8 mx-auto mb-4 ${scenario === key ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                    <div className={`font-bold text-lg mb-2 ${scenario === key ? 'text-blue-900' : 'text-gray-700'
                                        }`}>
                                        {scenarioData.label}
                                    </div>
                                    <div className={`text-sm ${scenario === key ? 'text-blue-700' : 'text-gray-500'
                                        }`}>
                                        {scenarioData.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Main Analysis Grid */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="grid xl:grid-cols-3 gap-8">
                    {/* Current Performance */}
                    <div>
                        <Card className="h-full">
                            <CardHeader className="border-b border-gray-100">
                                <CardTitle className="flex items-center text-slate-700">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mr-3">
                                        <FiBarChart className="w-5 h-5 text-slate-600" />
                                    </div>
                                    Current Performance
                                </CardTitle>
                                <p className="text-gray-600">Your organization's baseline metrics</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <div>
                                    <div className="text-sm font-semibold text-gray-700 mb-4 block">
                                        ANNUAL LEADS GENERATED
                                    </div>
                                    <Slider
                                        value={metrics.currentLeads}
                                        onValueChange={(value: number[]) => setMetrics(prev => ({ ...prev, currentLeads: value }))}
                                        max={1000}
                                        min={10}
                                        step={10}
                                        className="mb-4"
                                    />
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-slate-600 mb-1">
                                            {formatNumber(metrics.currentLeads[0])}
                                        </div>
                                        <div className="text-sm text-gray-500">qualified prospects annually</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-gray-700 mb-4 block">
                                        CONVERSION RATE
                                    </div>
                                    <Slider
                                        value={metrics.currentConversionRate}
                                        onValueChange={(value: number[]) => setMetrics(prev => ({ ...prev, currentConversionRate: value }))}
                                        max={100}
                                        min={0}
                                        step={1}
                                        className="mb-4"
                                    />
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-slate-600 mb-1">
                                            {metrics.currentConversionRate[0]}%
                                        </div>
                                        <div className="text-sm text-gray-500">leads to closed deals</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-gray-700 mb-4 block">
                                        SALES CYCLE
                                    </div>
                                    <Slider
                                        value={metrics.currentSalesCycle}
                                        onValueChange={(value: number[]) => setMetrics(prev => ({ ...prev, currentSalesCycle: value }))}
                                        max={24}
                                        min={1}
                                        step={1}
                                        className="mb-4"
                                    />
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-red-600 mb-1">
                                            {metrics.currentSalesCycle[0]} months
                                        </div>
                                        <div className="text-sm text-gray-500">average time to close</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-gray-700 mb-4 block">
                                        AVERAGE DEAL SIZE
                                    </div>
                                    <Slider
                                        value={metrics.currentDealSize}
                                        onValueChange={(value: number[]) => setMetrics(prev => ({ ...prev, currentDealSize: value }))}
                                        max={10000000}
                                        min={10000}
                                        step={5000}
                                        className="mb-4"
                                    />
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-red-600 mb-1">
                                            {formatCurrency(metrics.currentDealSize[0])}
                                        </div>
                                        <div className="text-sm text-gray-500">per closed opportunity</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
                                    <h4 className="font-bold text-red-800 mb-4 text-lg">CURRENT RESULTS</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Annual Deals:</span>
                                            <span className="font-bold text-xl">{formatNumber(results.current.deals)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Annual Revenue:</span>
                                            <span className="font-bold text-xl">{formatCurrency(results.current.revenue)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* DeepTrust Performance */}
                    <div>
                        <Card className="h-full">
                            <CardHeader className="border-b border-gray-100">
                                <CardTitle className="flex items-center text-blue-700">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                                        <FiTarget className="w-5 h-5 text-blue-600" />
                                    </div>
                                    DeepTrust OS+AI Performance
                                </CardTitle>
                                <p className="text-gray-600">Projected results with our platform</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <div className="text-center">
                                    <div className="text-sm font-semibold px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                                        {(scenarios as any)[scenario].label.toUpperCase()} SCENARIO
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Enhanced Close Rate</span>
                                            <FiTrendingUp className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">{results.deepTrust.closeRate}%</div>
                                        <div className="text-sm text-green-600 font-semibold">
                                            +{results.deepTrust.closeRate - metrics.currentConversionRate[0]}% improvement
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Accelerated Sales Cycle</span>
                                            <FiZap className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">{results.deepTrust.cycle} months</div>
                                        <div className="text-sm text-green-600 font-semibold">
                                            -{metrics.currentSalesCycle[0] - results.deepTrust.cycle} months faster
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Increased Deal Size</span>
                                            <FiDollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">{formatCurrency(results.deepTrust.dealSize)}</div>
                                        <div className="text-sm text-green-600 font-semibold">
                                            +{formatCurrency(results.deepTrust.dealSize - metrics.currentDealSize[0])} increase
                                        </div>
                                    </div>
                                </div>

                                <div className="text-white rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-cyan-600">
                                    <h4 className="font-bold mb-4 text-lg">DEEPTRUST RESULTS</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>Annual Deals:</span>
                                            <span className="font-bold text-xl">{formatNumber(results.deepTrust.deals)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Annual Revenue:</span>
                                            <span className="font-bold text-xl">{formatCurrency(results.deepTrust.revenue)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Impact Analysis */}
                    <div>
                        <Card className="h-full">
                            <CardHeader className="border-b border-gray-100">
                                <CardTitle className="flex items-center text-green-700">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                                        <FiTrendingUp className="w-5 h-5 text-green-600" />
                                    </div>
                                    Impact Analysis
                                </CardTitle>
                                <p className="text-gray-600">Quantified business transformation</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-8">
                                <div className="text-center">
                                    <div
                                        key={results.impact.roi}
                                        className="text-6xl font-bold mb-4"
                                        style={{
                                            background: 'linear-gradient(135deg, rgb(34, 197, 94) 0%, rgb(16, 185, 129) 100%)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        {results.impact.roi}%
                                    </div>
                                    <div className="text-xl font-bold text-green-700">ROI IMPROVEMENT</div>
                                    <div className="text-sm text-gray-600 mt-2">Return on DeepTrust investment</div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Additional Revenue</span>
                                            <FiDollarSign className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">{formatCurrency(results.impact.revenue)}</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                                                                                         <div
                                                 className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                                 style={{ width: '75%' }}
                                             />
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Additional Deals</span>
                                            <FiUsers className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">+{formatNumber(results.impact.deals)}</div>
                                        <div className="text-lg text-gray-600 mt-2 font-semibold">
                                            {Math.round((results.impact.deals / results.current.deals) * 100)}% increase
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-700 font-semibold">Time Savings</span>
                                            <FiClock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="text-2xl font-bold mb-2 text-primary">-{results.impact.cycle} months</div>
                                        <div className="text-sm text-gray-600 mt-2">per deal cycle</div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6">
                                    <h4 className="font-bold mb-3 text-lg flex items-center">
                                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                                            ✓
                                        </div>
                                        EXECUTIVE SUMMARY
                                    </h4>
                                    <p className="text-sm leading-relaxed">
                                        DeepTrust OS+AI implementation could generate an additional {formatCurrency(results.impact.revenue)} in annual revenue
                                        through {formatNumber(results.impact.deals)} additional deals, with {results.impact.cycle} months faster sales cycles.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Executive CTA */}
            <div
                className="max-w-7xl mx-auto px-6 pb-20"
            >
                <Card className="overflow-hidden relative">
                    <div className="text-white px-16 py-16 text-center relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600">
                        <div className="relative z-10">
                            <div
                                className="inline-flex items-center px-6 py-3 text-white bg-opacity-20 rounded-full text-sm font-semibold mb-8 bg-accent"
                            >
                                <FiBarChart className="w-4 h-4 mr-2" />
                                BOARD-READY EXECUTIVE REPORT
                            </div>

                            <h3 className="text-5xl font-bold mb-6 leading-tight">
                                Download Your Strategic Impact Analysis
                            </h3>

                            <p className="text-xl mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed">
                                Receive a comprehensive executive summary with detailed financial projections,
                                strategic recommendations, and implementation roadmap designed for C-suite presentation.
                            </p>

                            <button 
                                className="btn-primary text-lg px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative z-20 border-2 border-white"
                                onClick={() => {
                                    console.log('Button clicked!');
                                    setIsModalOpen(true);
                                }}
                                style={{ 
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    minHeight: '60px',
                                    backgroundColor: '#3B82F6',
                                    color: 'white'
                                }}
                            >
                                <FiDownload className="w-5 h-5 mr-3" />
                                GENERATE EXECUTIVE REPORT
                            </button>

                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogContent className="p-8 max-w-2xl">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-3xl font-bold text-gray-900">
                                            Executive Impact Report
                                        </DialogTitle>
                                        <p className="text-gray-600 mt-2">
                                            Comprehensive analysis for strategic decision making
                                        </p>
                                    </DialogHeader>

                                    <div className="space-y-6">
                                        <p className="text-gray-600 leading-relaxed">
                                            Please provide your executive details to receive a personalized impact analysis report
                                            formatted for board presentation and strategic planning.
                                        </p>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-3 block">
                                                    FULL NAME *
                                                </div>
                                                <input
                                                    type="text"
                                                    value={leadData.name}
                                                    onChange={(e) => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                                                    placeholder="John Smith"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-3 block">
                                                    EXECUTIVE TITLE *
                                                </div>
                                                <input
                                                    type="text"
                                                    value={leadData.title}
                                                    onChange={(e) => setLeadData(prev => ({ ...prev, title: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                                                    placeholder="Chief Executive Officer"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-gray-700 mb-3 block">
                                                EMAIL ADDRESS *
                                            </div>
                                            <input
                                                type="email"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                                                placeholder="john.smith@company.com"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-3 block">
                                                    DIRECT PHONE *
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={leadData.mobile}
                                                    onChange={(e) => setLeadData(prev => ({ ...prev, mobile: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                                                    placeholder="+1 (555) 123-4567"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-700 mb-3 block">
                                                    ORGANIZATION *
                                                </div>
                                                <input
                                                    type="text"
                                                    value={leadData.company}
                                                    onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                                                    placeholder="Acme Corporation"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-200">
                                            <h4 className="font-bold text-gray-800 mb-4 text-lg">EXECUTIVE REPORT INCLUDES:</h4>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                {[
                                                    'Current performance baseline analysis',
                                                    'DeepTrust OS+AI projection modeling',
                                                    'Financial impact calculations & ROI analysis',
                                                    'Strategic implementation roadmap',
                                                    'Executive summary for board presentation',
                                                    'Professional landscape PDF format'
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <span className="text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={async () => {
                                                try {
                                                    setIsGenerating(true);
                                                    await generatePDF(leadData, metrics, results, scenario);
                                                    // Close modal after successful generation
                                                    setTimeout(() => {
                                                        setIsModalOpen(false);
                                                        setIsGenerating(false);
                                                    }, 1000);
                                                } catch (error) {
                                                    console.error('Error generating PDF:', error);
                                                    setIsGenerating(false);
                                                }
                                            }}
                                            className="w-full btn-primary text-lg py-6"
                                            disabled={!leadData.name || !leadData.title || !leadData.email || !leadData.mobile || !leadData.company || isGenerating}
                                        >
                                            <FiDownload className="w-5 h-5 mr-3" />
                                            {isGenerating ? 'GENERATING REPORT...' : 'GENERATE & DOWNLOAD REPORT'}
                                        </button>

                                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                                            Your personalized executive report will be generated instantly and available for immediate download.
                                            All information is handled with enterprise-level confidentiality.
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-75">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                    Landscape PDF Format
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                    Professional Design
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                                    Instant Download
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ImpactAnalysis;