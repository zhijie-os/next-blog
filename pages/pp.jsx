import Layout from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import Project from "../components/project";
import Modal from "../components/modal";
import { useState } from "react";
import { ProjectData } from "../data/projectData";

// Publication Card Component
function PublicationCard({ title, conference, imageUrl, pdfUrl }) {
  const [showModal, setShowModal] = useState(false);
  const updateShowModal = () => setShowModal(!showModal);
  
  return (
    <div
      className="flex flex-col max-w-sm rounded-md bg-white p-5 m-2 text-slate-600 hover:shadow-lg hover:cursor-pointer transition-shadow border border-slate-100"
      onClick={() => setShowModal(true)}
    >
      <div className="text-slate-900 font-bold mb-1 leading-tight">
        {title}
      </div>
      <div className="text-indigo-600 font-medium mb-3">
        <small>{conference}</small>
      </div>
      <div className="relative w-full h-48 overflow-hidden rounded">
        <Image
          className="object-cover object-center"
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <Modal showModal={showModal} updateShowModal={updateShowModal} title={title} pdfUrl={pdfUrl}/>
    </div>
  );
}

export default function ResearchAndProjects() {
  return (
    <Layout home={false}>
      <Head>
        <title>Research & Projects | Zhijie Xia</title>
      </Head>

      <div className="max-w-4xl flex flex-col space-y-12 mb-20">
        
        {/* --- PUBLICATIONS SECTION --- */}
        <section className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-tracking-tight text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
              Publications
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Selected research from Programmable Reality Lab & RL Research.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start pt-8">
            <PublicationCard 
              title="RealityCanvas: Augmented Reality Sketching for Embedded and Responsive Scribble Animation Effects"
              conference="ACM UIST 2023"
              imageUrl="/teaser/reality-canvas.gif"
              pdfUrl="reality-canvas.pdf"
            />
            <PublicationCard 
              title="RealityEffects: Augmenting 3D Volumetric Videos with Object-Centric Annotation and Dynamic Visual Effects"
              conference="ACM DIS 2024"
              imageUrl="/teaser/RealityEffects.gif"
              pdfUrl="RealityEffects.pdf"
            />
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-tracking-tight text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
              Systems & Projects
            </h1>
          </div>

          <div className="container pt-4">
            <div className="flex flex-col divide-y divide-gray-700">
              {ProjectData.map((p) => (
                <div key={p.title} className='py-6'>
                  <Project
                    title={p.title}
                    description={p.description}
                    link={p.link}
                    imageUrl={p.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}