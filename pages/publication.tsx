import Layout from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import Modal from "../components/modal";
import { useState } from "react";

interface PublicationCardProps {
  title: string;
  conference: string;
  imageUrl: string;
  onClick?: () => void; // Made optional with ? since it might not always be provided
}

// Publication Card Component
function PublicationCard({ title, conference, imageUrl, onClick }: PublicationCardProps) {
  return (
    <div
      className="group flex flex-col h-full rounded-xl bg-white dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={imageUrl}
          alt={title}
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-indigo-600 dark:text-indigo-400 font-bold text-xs tracking-widest uppercase mb-2">
          {conference}
        </div>
        <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function Publications() {
  const [selectedPaper, setSelectedPaper] = useState<{title: string, pdfUrl: string} | null>(null);

  const publications = [
    {
      title: "ACRL: Adaptive Control of Training-Inference Discrepancy for Stable Reinforcement Learning",
      conference: "ICML 2026",
      imageUrl: "/teaser/ACRL.png",
      pdfUrl: "ACRL.pdf",
    },
    {
      title: "RealityEffects: Augmenting 3D Volumetric Videos with Object-Centric Annotation and Dynamic Visual Effects",
      conference: "DIS 2024",
      imageUrl: "/teaser/RealityEffects.gif",
      pdfUrl: "RealityEffects.pdf",
    },
    {
      title: "RealityCanvas: Augmented Reality Sketching for Embedded and Responsive Scribble Animation Effects",
      conference: "UIST 2023",
      imageUrl: "/teaser/reality-canvas.gif",
      pdfUrl: "reality-canvas.pdf",
    }
  ];

  return (
    <Layout home={false}>
      <Head>
        <title>Publications | Zhijie Xia</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <section>
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Selected Publications
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-gray-400 max-w-2xl">
              Research focusing on stable Reinforcement Learning and 
              Human-AI interaction systems.
            </p>
          </div>
          
          {/* Publications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub) => (
              <PublicationCard 
                key={pub.title}
                {...pub}
                onClick={() => setSelectedPaper(pub)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Global Modal Portal for PDF Viewing */}
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