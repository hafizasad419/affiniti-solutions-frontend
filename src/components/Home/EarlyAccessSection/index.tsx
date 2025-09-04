function EarlyAccessSection() {
  return (
    <section className="py-28 bg-gray-200/50 text-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <h1 className="font-extrabold mb-8 leading-tight !shadow-lg !inline-block px-8 py-4 rounded-xl ">
            Get Early Access To DeepTrust AI
          </h1>
          <button
            className="btn-primary !mx-auto !shadow-lg !shadow-cyan-500/60 "
            onClick={() => {
              window.open('https://deeptrustai.affinitisolutions.com/', '_blank');
            }}
          >
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  )
}

export default EarlyAccessSection
