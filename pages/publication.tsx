import Layout from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import { Worker } from "@react-pdf-viewer/core";
import Modal from "../components/modal";
import { useEffect, useState } from "react";

//@ts-ignore
function Hero({ title, conference, imageUrl, pdfUrl}) {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = () => {
    setShowModal(!showModal);
  }
  
  return (
    <div
      className="container flex flex-col max-w-sm rounded-md bg-white p-5 m-5 text-slate-600 hover:shadow-lg hover:cursor-pointer"
      onClick={(() => setShowModal(true))}
    >
      <div className="text-slate-900">
        {title}
      </div>
      <div className="text-slate-900">
        <small>{conference}</small>
      </div>
      <Image
        className="rounded object-cover object-center md:h-36 lg:h-48"
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
      />
      <Modal showModal={showModal} updateShowModal={updateShowModal} title={title} pdfUrl={pdfUrl}/>
    </div>
  );
}

export default function Publication() {
  return (
    <Layout home={false}>
      <Head>
        <title>Publication | Zhijie Xia</title>
      </Head>

      <div className="flex flex-col max-w-4xl  divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-tracking-tight text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
            Publication
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Previous publications in Programmable Reality Lab
          </p>
        </div>
        <div className="flex flex-wrap">
          <Hero 
            title="RealityCanvas: Augmented Reality Sketching for Embedded and Responsive Scribble Animation Effects"
            conference="UIST 2023"
            imageUrl="/teaser/reality-canvas.gif"
            pdfUrl="reality-canvas.pdf"
          />
          <Hero 
            title="RealityEffects: Augmenting 3D Volumetric Videos with Object-Centric Annotation and Dynamic Visual Effects"
            conference="DIS 2024"
            imageUrl="/teaser/RealityEffects.gif"
            pdfUrl="RealityEffects.pdf"
          />
        </div>
      </div>
    </Layout>
  );
}
