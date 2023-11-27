import Layout from "../components/layout";
import Head from "next/head";
import Image from "next/image";
import { Worker } from "@react-pdf-viewer/core";
import Modal from "../components/modal";
import { useEffect, useState } from "react";


function Hero() {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = () => {
    setShowModal(!showModal);
  }
  
  return (
    <div
      className="container flex flex-col max-w-sm rounded-md bg-white p-5 m-5 text-slate-600 hover:shadow-lg hover:cursor-pointer"
      onClick={() => setShowModal(true)}
    >
      <div className="text-slate-900">
        RealityCanvas: Augmented Reality Sketching for Embedded and Responsive
        Scribble Animation Effects
      </div>
      <div className="text-slate-900">
        <small>UIST 2023</small>
      </div>
      <Image
        className="rounded object-cover object-center md:h-36 lg:h-48"
        src={"/teaser/reality-canvas.gif"}
        alt={"RealityCanvas"}
        width={400}
        height={400}
      />
      <Modal showModal={showModal} updateShowModal={updateShowModal} />
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
            Besides being a developer, I am also a researcher at Programmable Reality Lab.
          </p>
        </div>
        <Hero></Hero>
      </div>
    </Layout>
  );
}
