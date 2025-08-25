import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Play, ArrowRight, Target, Clock, DollarSign, TrendingUp, Users, Shield, Zap, BarChart3, CheckCircle, Star } from 'lucide-react'
import './App.css'
import nathanIntroVideo from './assets/videos/nathan-intro.mp4'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLeads, setCurrentLeads] = useState(1000)
  const [currentCloseRate, setCurrentCloseRate] = useState(5)
  const [currentDealSize, setCurrentDealSize] = useState(50000)
  const [currentSalesCycle, setCurrentSalesCycle] = useState(180)
  const [targetReferrals, setTargetReferrals] = useState(200)
  const [enhancedCloseRate, setEnhancedCloseRate] = useState(35)
  const [enhancedDealSize, setEnhancedDealSize] = useState(75000)
  const [enhancedSalesCycle, setEnhancedSalesCycle] = useState(90)

  // Calculate ROI metrics
  const currentDeals = Math.round((currentLeads * currentCloseRate) / 100)
  const currentRevenue = currentDeals * currentDealSize
  const enhancedDeals = Math.round((targetReferrals * enhancedCloseRate) / 100)
  const enhancedRevenue = enhancedDeals * enhancedDealSize
  const additionalRevenue = enhancedRevenue - currentRevenue
  const roiPercentage = currentRevenue > 0 ? Math.round(((enhancedRevenue - currentRevenue) / currentRevenue) * 100) : 0

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-white">
                <div className="text-xl font-bold">Affiniti Solutions</div>
                <div className="text-xs text-cyan-400 font-medium">DEEPTRUST OS+AI</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="text-white hover:text-cyan-400" onClick={() => scrollToSection('how-it-works')}>
                How It Works
              </Button>
              <Button variant="ghost" className="text-white hover:text-cyan-400" onClick={() => scrollToSection('programs')}>
                Programs
              </Button>
              <Button variant="ghost" className="text-white hover:text-cyan-400" onClick={() => scrollToSection('roi-calculator')}>
                ROI Calculator
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-6 py-2 rounded-full font-semibold"
                onClick={() => setIsModalOpen(true)}
              >
                Schedule Discovery Call
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Executive Growth Solution
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Science of Generating{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  High-Value Referrals
                </span>{' '}
                at Scale
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Join forward-thinking executives who've discovered the systematic approach to generating 100-1000+ qualified referrals annually without cold outreach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg"
                  onClick={() => scrollToSection('roi-calculator')}
                >
                  See Your Potential ROI
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 rounded-full font-semibold text-lg"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="aspect-video bg-slate-900/50 rounded-lg overflow-hidden">
                    <video
                      className="w-full h-full object-cover"
                      controls
                    >
                      <source src={nathanIntroVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-slate-300 text-center mt-4">See how DeepTrust OS+AI transforms your sales results</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Proven Performance Metrics</h2>
            <p className="text-xl text-slate-600">Real results from enterprise implementations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">30-50%</div>
                <h3 className="font-semibold text-slate-900 mb-2">Higher Conversion</h3>
                <p className="text-slate-600">vs traditional outreach</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-cyan-500 mb-2">25-40%</div>
                <h3 className="font-semibold text-slate-900 mb-2">Shorter Sales Cycles</h3>
                <p className="text-slate-600">Faster revenue realization</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-green-600 mb-2">40-60%</div>
                <h3 className="font-semibold text-slate-900 mb-2">Lower Acquisition Costs</h3>
                <p className="text-slate-600">Maximum ROI efficiency</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-purple-600 mb-2">100-1000+</div>
                <h3 className="font-semibold text-slate-900 mb-2">Annual Referrals</h3>
                <p className="text-slate-600">Systematic generation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why settle for declining performance when systematic referrals are proven to work?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Join forward-thinking executives discovering the systematic approach to generating 100-1000+ qualified referrals annually without cold outreach.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white px-8 py-4 rounded-full font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Apply to See if You Qualify
            </Button>
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
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Plummeting Close Rates</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">5%</div>
                <p className="text-sm text-slate-600 mb-4">Average cold outreach close rate</p>
                <p className="text-sm text-slate-600">
                  Average B2B close rates have fallen to just 2-5% for cold outreach, compared to 14.6% for organic search.
                </p>
                <p className="text-sm font-medium text-red-600 mt-2">20-50x more leads needed for same results</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-orange-600 mb-2">AI-Powered Competition</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">47%</div>
                <p className="text-sm text-slate-600 mb-4">Marketers using AI for outreach</p>
                <p className="text-sm text-slate-600">
                  47% of marketers are leveraging AI in their outreach, creating unprecedented inbox competition.
                </p>
                <p className="text-sm font-medium text-orange-600 mt-2">Traditional strategies increasingly ineffective</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-yellow-600 mb-2">Complex Buying Committees</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">10.5</div>
                <p className="text-sm text-slate-600 mb-4">Average stakeholders in B2B decisions</p>
                <p className="text-sm text-slate-600">
                  The average B2B buying group now includes 10-11 stakeholders, with 52% including VP-level or above.
                </p>
                <p className="text-sm font-medium text-yellow-600 mt-2">Sales cycles extended to 11.5 months</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-600">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Deteriorating Lead Quality</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">75%</div>
                <p className="text-sm text-slate-600 mb-4">Marketing leads that never convert</p>
                <p className="text-sm text-slate-600">
                  75% of marketing-generated leads never convert to sales, with massive misalignment between sellers and buyers.
                </p>
                <p className="text-sm font-medium text-red-600 mt-2">Massive waste in marketing spend</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">The Solution Isn't More Cold Outreach</h3>
            <p className="text-lg text-slate-600">
              It's building authentic relationships through qualified referrals that bypass these challenges entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">From Frustration to Transformation</h2>
            <p className="text-xl text-slate-600">How 3 million executive engagements led to a breakthrough in referral generation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <CardContent className="p-8 pt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The Breaking Point</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3M+</div>
                    <div className="text-sm text-slate-600">Executive Engagements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">100K+</div>
                    <div className="text-sm text-slate-600">Sales Meetings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">3%</div>
                    <div className="text-sm text-slate-600">Maximum Close Rate</div>
                  </div>
                </div>
                <p className="text-slate-600">
                  Our founder, Nathan Kievman, led an organization that generated over 3 million executive engagements using traditional prospecting strategies. Despite massive scale and optimization, these efforts never exceeded a 3% close rate — and were deteriorating rapidly as AI-powered competition flooded executive inboxes.
                </p>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <CardContent className="p-8 pt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The Critical Insight</h3>
                <p className="text-slate-600 mb-6">
                  Through deep analysis and research, Nathan discovered something profound: most successful companies already grow through referrals — they just don't know how to systematize and scale this approach.
                </p>
                <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-slate-700 bg-slate-50 p-4 rounded">
                  "The traditional outreach model was fundamentally broken, regardless of how well it was executed. But referrals consistently outperformed every other channel—the challenge was making them systematic and scalable."
                  <footer className="text-sm text-slate-600 mt-2">— Nathan Kievman, Founder</footer>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <CardContent className="p-8 pt-12">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The Breakthrough Solution</h3>
                <p className="text-slate-600 mb-6">
                  This insight led to the development of DeepTrust OS: a revolutionary system that generates systematic and scalable referrals without requiring cold outreach, cold calling, or even relying solely on your current client base.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    25-50% higher conversion rates
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    50% shorter sales cycles
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    10-50% increase in avg deal size
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your DeepTrust OS Implementation</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">DeepTrust OS Accelerator</h3>
                <Badge className="mb-4 bg-blue-100 text-blue-700">Mastermind Format</Badge>
                <p className="text-slate-600 mb-6">
                  Join our group of fellow peers and learn to install the operating system yourself. Perfect for companies ready to build their own DeepTrust networks.
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-lg mb-6">
                  <div className="font-semibold">Target: 50-100 referrals annually</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-cyan-400 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1">
                Most Popular
              </Badge>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">DeepTrust OS Catalyst</h3>
                <Badge className="mb-4 bg-cyan-100 text-cyan-700">2-Day Sprint Workshop</Badge>
                <p className="text-slate-600 mb-6">
                  We come in for an intensive workshop and build your entire infrastructure within a week. Fast implementation with immediate results.
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-lg mb-6">
                  <div className="font-semibold">Target: 100-300 referrals annually</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">DeepTrust OS Sovereign</h3>
                <Badge className="mb-4 bg-purple-100 text-purple-700">Full-Service Implementation</Badge>
                <p className="text-slate-600 mb-6">
                  Our team builds, runs, and manages your entire DeepTrust network for the first year. Complete done-for-you solution.
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-lg mb-6">
                  <div className="font-semibold">Target: 500-1000+ referrals annually</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The DeepTrust Advantage</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Predictable Results</h3>
                <p className="text-slate-600">Systematic approach delivers consistent referral flow year over year</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Faster Sales Cycles</h3>
                <p className="text-slate-600">Trust transfer accelerates decision-making and reduces friction</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Higher Deal Values</h3>
                <p className="text-slate-600">Access to enterprise opportunities through network connections</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">AI-Powered Intelligence</h3>
                <p className="text-slate-600">Network analyzer identifies optimal referral opportunities</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Scalable Growth</h3>
                <p className="text-slate-600">System grows with your business and compounds over time</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Competitive Advantage</h3>
                <p className="text-slate-600">Deep trust networks lead to relationships that create sustainable competitive advantages</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Calculate Your DeepTrust ROI</h2>
            <p className="text-xl text-slate-300">See the potential impact of implementing DeepTrust OS in your organization.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Current Performance</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white mb-2 block">Annual Leads Generated</Label>
                    <Input 
                      type="number" 
                      value={currentLeads} 
                      onChange={(e) => setCurrentLeads(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Current Close Rate: {currentCloseRate}%</Label>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      value={currentCloseRate}
                      onChange={(e) => setCurrentCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Average Deal Size ($)</Label>
                    <Input 
                      type="number" 
                      value={currentDealSize} 
                      onChange={(e) => setCurrentDealSize(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Current Sales Cycle (days)</Label>
                    <Input 
                      type="number" 
                      value={currentSalesCycle} 
                      onChange={(e) => setCurrentSalesCycle(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-cyan-400 mb-6 mt-8">DeepTrust OS Projections</h3>
                <div className="space-y-6">
                  <div>
                    <Label className="text-white mb-2 block">Target Referrals: {targetReferrals}</Label>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000" 
                      step="50"
                      value={targetReferrals}
                      onChange={(e) => setTargetReferrals(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Enhanced Close Rate: {enhancedCloseRate}%</Label>
                    <input 
                      type="range" 
                      min="15" 
                      max="50" 
                      value={enhancedCloseRate}
                      onChange={(e) => setEnhancedCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Enhanced Deal Size ($)</Label>
                    <Input 
                      type="number" 
                      value={enhancedDealSize} 
                      onChange={(e) => setEnhancedDealSize(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Enhanced Sales Cycle (days)</Label>
                    <Input 
                      type="number" 
                      value={enhancedSalesCycle} 
                      onChange={(e) => setEnhancedSalesCycle(Number(e.target.value))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculator Results */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Impact Analysis</h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Current Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Annual Revenue:</span>
                      <span className="text-cyan-400 font-bold">${currentRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Deals Closed:</span>
                      <span className="text-cyan-400 font-bold">{currentDeals}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">DeepTrust Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Annual Revenue:</span>
                      <span className="text-cyan-400 font-bold">${enhancedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Deals Closed:</span>
                      <span className="text-cyan-400 font-bold">{enhancedDeals}</span>
                    </div>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-blue-500 to-cyan-400 mb-8">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-white mb-2">{roiPercentage}%</div>
                    <div className="text-white">ROI Increase</div>
                  </CardContent>
                </Card>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Revenue Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Additional Revenue:</span>
                      <span className="text-green-400 font-bold">${additionalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Additional Deals:</span>
                      <span className="text-green-400 font-bold">{enhancedDeals - currentDeals}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Schedule Strategy Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                    onClick={() => alert('PDF report functionality coming soon!')}
                  >
                    Download PDF Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Referral Generation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join forward-thinking executives who've discovered the systematic approach to generating high-value referrals at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Schedule Discovery Call
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 px-8 py-4 rounded-full font-semibold text-lg"
              onClick={() => scrollToSection('roi-calculator')}
            >
              Calculate Your ROI
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Affiniti Solutions</h3>
              <p className="text-slate-300">
                Transforming enterprise sales through systematic referral generation and AI-powered relationship intelligence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('how-it-works')} className="block text-slate-300 hover:text-cyan-400">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('programs')} className="block text-slate-300 hover:text-cyan-400">
                  Programs
                </button>
                <button onClick={() => scrollToSection('roi-calculator')} className="block text-slate-300 hover:text-cyan-400">
                  ROI Calculator
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Contact</h3>
              <p className="text-slate-300 mb-2">Ready to get started?</p>
              <button onClick={() => setIsModalOpen(true)} className="text-cyan-400 hover:text-cyan-300">
                Schedule Discovery Call
              </button>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Affiniti Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Meeting Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Your DeepTrust Discovery Call</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-600">
              Book a 30-minute strategy session to explore how DeepTrust OS can transform your referral generation.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" placeholder="Enter your full name" />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>
              
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              
              <div>
                <Label htmlFor="revenue">Current Annual Revenue</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                    <SelectItem value="50m-plus">$50M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="challenge">What's your biggest challenge with lead generation?</Label>
                <Textarea id="challenge" placeholder="Tell us about your current challenges..." />
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                onClick={() => {
                  alert('Thank you! We\'ll contact you within 24 hours to schedule your discovery call.')
                  setIsModalOpen(false)
                }}
              >
                Schedule My Discovery Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App

