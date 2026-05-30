import Hero from "@/components/sections/hero";
import FullServicePromise from "@/components/sections/full-service-promise";
import TrustStrip from "@/components/sections/trust-strip";
import PatientPaths from "@/components/sections/patient-paths";
import Explainer from "@/components/sections/explainer";
import HowItWorks from "@/components/sections/how-it-works";
import DeliveryChecker from "@/components/sections/delivery-checker";
import AreasServed from "@/components/sections/areas-served";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Team from "@/components/sections/team";
import Contact from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FullServicePromise />
      <TrustStrip />
      <PatientPaths />
      <Explainer />
      <HowItWorks />
      <DeliveryChecker />
      <AreasServed />
      <Services />
      <About />
      <Team />
      <div id="hours" className="scroll-mt-24" />
      <Contact />
    </>
  );
}
