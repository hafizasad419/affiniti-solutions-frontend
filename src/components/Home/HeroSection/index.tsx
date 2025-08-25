import nathanIntroVideo from '@/assets/videos/nathan-intro.mp4';    


function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
            <div className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 inline-block px-4 py-2 rounded-full">
                Executive Growth Solution
            </div>
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
            <button 
              className="btn-primary"
            >
              See Your Potential ROI
            </button>
            <button 
              className="btn-secondary"
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-slate-800/50 border-gray-700 border-1 backdrop-blur-sm rounded-3xl">
            <div className="p-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroSection