

const CTASection = () => {
    return (
        <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Ready to Transform Your Referral Generation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join forward-thinking executives who've discovered the systematic approach to generating high-value referrals at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-primary"
              onClick={() => {
                window.open('https://calendly.com/natekievman/ai-accelerator-exploratory-call', '_blank');
                console.log('Schedule Discovery Call clicked');
              }}
            >
              Schedule Discovery Call
            </button>
            {/* <button 
              className="btn-secondary"
              onClick={() => {
              }}
            >
              Calculate Your ROI
            </button> */}
          </div>
        </div>
      </section>
    )
}

export default CTASection