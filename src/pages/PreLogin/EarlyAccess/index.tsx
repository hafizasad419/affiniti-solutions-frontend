import HeroSection from "@/components/EarlyAccess/HeroSection"
import ProblemSection from "@/components/EarlyAccess/ProblemSection"
import BreakthroughSection from "@/components/EarlyAccess/BreakthroughSection"
import EarlyAccessMatters from "@/components/EarlyAccess/EarlyAccessMatters"
import SocialProof from "@/components/EarlyAccess/SocialProof"
import CallToAction from "@/components/EarlyAccess/CallToAction"

function EarlyAccess() {
  return (
    <div
      className="min-h-screen bg-dark-primary py-12"
    >
      <HeroSection />
      <ProblemSection />
      <BreakthroughSection />
      <EarlyAccessMatters />
      <SocialProof /> 
      <CallToAction />
    </div>
  )
}

export default EarlyAccess