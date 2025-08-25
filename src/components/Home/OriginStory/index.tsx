import { FaCheckCircle } from "react-icons/fa"

interface Metric {
  value: string
  label: string
  color: string
}

interface StoryCardProps {
  step: number
  title: string
  description: string
  metrics?: Metric[]
  quote?: {
    text: string
    author: string
  }
  benefits?: string[]
}

const storyData: StoryCardProps[] = [
  {
    step: 1,
    title: "The Breaking Point",
    description: "Our founder, Nathan Kievman, led an organization that generated over 3 million executive engagements using traditional prospecting strategies. Despite massive scale and optimization, these efforts never exceeded a 3% close rate — and were deteriorating rapidly as AI-powered competition flooded executive inboxes.",
    metrics: [
      { value: "3M+", label: "Executive Engagements", color: "text-blue-600" },
      { value: "100K+", label: "Sales Meetings", color: "text-blue-600" },
      { value: "3%", label: "Maximum Close Rate", color: "text-red-600" }
    ]
  },
  {
    step: 2,
    title: "The Critical Insight",
    description: "Through deep analysis and research, Nathan discovered something profound: most successful companies already grow through referrals — they just don't know how to systematize and scale this approach.",
    quote: {
      text: "The traditional outreach model was fundamentally broken, regardless of how well it was executed. But referrals consistently outperformed every other channel—the challenge was making them systematic and scalable.",
      author: "Nathan Kievman, Founder"
    }
  },
  {
    step: 3,
    title: "The Breakthrough Solution",
    description: "This insight led to the development of DeepTrust OS: a revolutionary system that generates systematic and scalable referrals without requiring cold outreach, cold calling, or even relying solely on your current client base.",
    benefits: [
      "25-50% higher conversion rates",
      "50% shorter sales cycles",
      "10-50% increase in avg deal size"
    ]
  }
]

function StoryCard({ step, title, description, metrics, quote, benefits }: StoryCardProps) {
  return (
    <div className="relative hover:shadow-lg transition-shadow border border-gray-300 rounded-lg">
      <div className="absolute -top-4 -left-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
        {step}
      </div>
      <div className="p-8 pt-12">
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        
        {metrics && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-slate-600 mb-6">{description}</p>
        
        {quote && (
          <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-slate-700 bg-slate-50 p-4 rounded">
            "{quote.text}"
            <footer className="text-sm text-slate-600 mt-2">— {quote.author}</footer>
          </blockquote>
        )}
        
        {benefits && (
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-slate-700">
                <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function OriginStory() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">From Frustration to Transformation</h2>
          <p className="text-xl text-slate-600">How 3 million executive engagements led to a breakthrough in referral generation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {storyData.map((story) => (
            <StoryCard key={story.step} {...story} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default OriginStory