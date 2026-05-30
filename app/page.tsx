import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Team from "@/components/sections/team";
import Contact from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <About />
      <Team />
      <div id="hours" className="scroll-mt-24" />
      <Contact />
    </>
  );
}
