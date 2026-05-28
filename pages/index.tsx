import Layout from "../components/layout";
import Image from "next/image";
import { useState } from "react";
import Modal from "../components/modal";
import { ProjectData } from "../data/projectData";
import Project from "../components/project";

const educationData = [
  {
    time: "Sep 2026 (Incoming)",
    title: "MSc in Computing Science (Thesis)",
    org: "University of Alberta",
    location: "Edmonton, AB, Canada",
    logo: "/logos/ualberta-logo.jpg",
  },
  {
    time: "2019 - 2024",
    title: "BSc in Computer Science, First-class Honours (GPA 3.92/4)",
    org: "University of Calgary",
    location: "Calgary, AB, Canada",
    logo: "/logos/ucalgary-logo.png",
  },
];

const experienceData = [
  {
    time: "Nov 2025 - Present",
    title: "Applied RL for LLM Researcher",
    org: "Huawei",
    location: "Hangzhou, Zhejiang, China",
    logo: "/logos/huawei-logo.png",
  },
  {
    time: "Sep 2024 - Nov 2025",
    title: "AI Infrastructure Engineer",
    org: "Huawei",
    location: "Hangzhou, Zhejiang, China",
    logo: "/logos/huawei-logo.png",
  },
  {
    time: "Sep 2023 - Sep 2024",
    title: "Test & Firmware Developer",
    org: "Lucid Vision Labs",
    location: "Richmond, BC, Canada",
    logo: "/logos/lucid-logo.jpg",
  },
  {
    time: "Jun 2023 - Aug 2023",
    title: "Full-stack Developer",
    org: "New Technologies",
    location: "Toronto, ON, Canada",
    logo: "/logos/newsoftware-logo.jpg",
  },
  {
    time: "Apr 2022 - Sep 2023",
    title: "Mixed Reality Researcher",
    org: "Programmable Reality Lab, University of Calgary",
    location: "Calgary, AB, Canada",
    logo: "/logos/ucalgary-logo.png",
  },
];

const publications = [
  {
    title: "ACRL: Adaptive Control of Training-Inference Discrepancy for Stable Reinforcement Learning",
    authors: "Wenwu Fan*, Qihong Lin*, Zhijie Xia*, Zhuo Zheng, Sihao Wang, Qiang Chen, Liangsheng Zhu",
    venue: "ICML 2026",
    pdfUrl: "/ACRL.pdf",
  },
  {
    title: "RealityEffects: Augmenting 3D Volumetric Videos with Object-Centric Annotation and Dynamic Visual Effects",
    authors: "Jian Liao, Kevin Van, Zhijie Xia, Ryo Suzuki",
    venue: "DIS 2024",
    pdfUrl: "/RealityEffects.pdf",
  },
  {
    title: "RealityCanvas: Augmented Reality Sketching for Embedded and Responsive Scribble Animation Effects",
    authors: "Zhijie Xia*, Kyzyl Monteiro*, Kevin Van, Ryo Suzuki",
    venue: "UIST 2023",
    pdfUrl: "/reality-canvas.pdf",
  },
];

export default function Home() {
  const [selectedPaper, setSelectedPaper] = useState<{ title: string; pdfUrl: string } | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zhijie Xia',
    url: 'https://zhijiexia.dev',
    jobTitle: 'AI Infrastructure Engineer & Researcher',
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Calgary' },
      { '@type': 'CollegeOrUniversity', name: 'University of Alberta' },
    ],
    sameAs: [
      'https://github.com/zhijie-os',
      'https://www.linkedin.com/in/zhijie-xia-678b331b5/',
    ],
  };

  return (
    <Layout wide>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — full width above the two-column layout */}
      <section className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="h-[110px] w-[110px] overflow-hidden rounded-full">
              <Image
                src="/images/avatar.jpg"
                alt="Zhijie Xia"
                width={110}
                height={110}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Zhijie Xia
            </h1>
            <p className="mt-1 text-lg text-neutral-700 dark:text-neutral-300">
              AI Infrastructure Engineer & Researcher
            </p>
            <p className="mt-3 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-lg">
              I build AI infrastructure and conduct research in reinforcement learning. Previously at Huawei, Lucid Vision Labs,
              and the Programmable Reality Lab. Incoming MSc student at University of Alberta under Dr. Rupam Mahmood.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
              <a href="mailto:zhijiexiacs@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline">Email</a>
              <span>/</span>
              <a href="https://github.com/zhijie-os" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline">GitHub</a>
              <span>/</span>
              <a href="https://www.linkedin.com/in/zhijie-xia-678b331b5/" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline">LinkedIn</a>
              <span>/</span>
              <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline">Google Scholar</a>
              <span>/</span>
              <a href="/CV.pdf" className="hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline">CV</a>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout: main content (left) + timeline (right) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mb-16">
        {/* Left column: Publications + Projects */}
        <div className="lg:w-[70%] min-w-0">

          {/* Publications */}
          <section className="pb-10">
            <h2 className="section-heading">Publications</h2>
            <div className="space-y-6">
              {publications.map((pub, i) => (
                <div key={i} className="cv-entry">
                  <div className="cv-title">
                    {pub.title}
                  </div>
                  <div className="cv-meta mt-0.5">
                    {pub.authors.split(', ').map((name, j) => (
                      <span key={j}>
                        {j > 0 && ', '}
                        {name.includes('Zhijie Xia') ? (
                          <strong className="font-semibold text-neutral-800 dark:text-neutral-200">{name}</strong>
                        ) : (
                          name
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{pub.venue}</span>
                    <span className="text-neutral-300 dark:text-neutral-700">|</span>
                    <button
                      onClick={() => setSelectedPaper({ title: pub.title, pdfUrl: pub.pdfUrl })}
                      className="resource-link hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="pb-10">
            <h2 className="section-heading">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ProjectData.map((p) => (
                <Project
                  key={p.title}
                  title={p.title}
                  description={p.description}
                  imageUrl={p.imageUrl}
                  link={p.link}
                  venue={p.venue}
                  date={p.date}
                />
              ))}
            </div>
          </section>

        </div>

        {/* Right column: Education + Experience */}
        <aside className="lg:w-[30%]">
          <div className="lg:sticky lg:top-8">

            {/* Education */}
            <h2 className="section-heading">Education</h2>
            <div className="space-y-4 mb-8">
              {educationData.map((item, i) => (
                <div key={i}>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Image
                      src={item.logo}
                      alt={item.org}
                      width={24}
                      height={24}
                      className="rounded flex-shrink-0"
                    />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.org}</span>
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    {item.location}
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <h2 className="section-heading">Experience</h2>
            <div className="space-y-4">
              {experienceData.map((item, i) => (
                <div key={i}>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Image
                      src={item.logo}
                      alt={item.org}
                      width={24}
                      height={24}
                      className="rounded flex-shrink-0 object-contain"
                    />
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.org}</span>
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    {item.location}
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 font-mono">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </aside>
      </div>

      {/* PDF Modal */}
      {selectedPaper && (
        <Modal
          showModal={!!selectedPaper}
          updateShowModal={() => setSelectedPaper(null)}
          title={selectedPaper.title}
          pdfUrl={selectedPaper.pdfUrl}
        />
      )}
    </Layout>
  );
}
