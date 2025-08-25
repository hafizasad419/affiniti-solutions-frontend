import HeroSection from "@/components/Home/HeroSection"
import MetricsSection from "@/components/Home/MetricsSection"
import ProblemSection from "@/components/Home/ProblemSection"
import OriginStory from "@/components/Home/OriginStory"
import Programs from "@/components/Home/Programs"
import Benifits from "@/components/Home/Benifits"
import ImpactAnalysis from "@/components/Home/ImpactAnalysis"
import CTASection from "@/components/Home/CTASection"

function Home() {
  return (
    <div>
      <HeroSection />
      <MetricsSection />
      <ProblemSection />
      {/* How It Works Section aka Origin Story */}
      <OriginStory />
      <Programs />
      <Benifits />
      <ImpactAnalysis />
      <CTASection />
    </div>
  )
}

export default Home