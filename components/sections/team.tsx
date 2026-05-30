import Image from "next/image";
import Reveal from "@/components/reveal";

const TEAM = [
  {
    img: "/images/IMG_1566.JPG",
    name: "Shah Alam Bhuiyan, RPh, PhD",
    role: "Pharmacist in Charge",
    bio: "12+ years of experience as a pharmacist, including 10 years at CVS. Shah ensures each patient receives the personal care they deserve. Alongside his Pharmacy degree, he earned a PhD in Molecular Pharmacy and Genetics in Japan and held post-doctoral research positions in Japan and the USA. He spent 10+ years as an Associate Professor at a Pharmacy School and has published 45+ peer-reviewed scientific articles.",
  },
  {
    img: "/images/IMG_1569.JPG",
    name: "Mohammed Mosharaff Hosson",
    role: "Pharmacy Operations Manager",
    bio: "Mosharraf carries out the daily logistics of the pharmacy and continually improves the business with new ideas. He holds graduate and master's degrees in business with a major in accounting and has been successfully involved in business for over two decades. His empathy, patience, and problem-solving consistently exceed customer expectations.",
  },
];

export default function Team() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Meet the team
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">The people behind your care</h2>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.1}>
            <div className="surface-card h-full overflow-hidden rounded-3xl">
              <Image
                src={m.img}
                alt={m.name}
                width={900}
                height={700}
                className="h-72 w-full object-cover object-top"
              />
              <div className="p-7">
                <h3 className="text-xl font-bold text-text-header">{m.name}</h3>
                <p className="mt-0.5 font-medium text-brand">{m.role}</p>
                <p className="mt-3 text-text-body">{m.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
