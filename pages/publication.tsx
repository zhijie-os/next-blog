import Layout from "../components/layout";
import Head from "next/head";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
// import "@react-pdf-viewer/core/lib/styles/index.css";

export default function Publication() {
  return (
    <Layout home={false}>
      <Head>
        <title>Publication | Zhijie Xia</title>
      </Head>
{/* 
      <div className="max-w-4xl flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        <div>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Besides being a developer, I am also a researcher at Programmable
            Reality Lab
          </p>
        </div>
      </div> */}

      <div
      // className="flex justify-center"
        style={{
          // position: "absolute",
          // border: "1px solid rgba(0, 0, 0, 0.3)",
          width: "1200px",
          // height: "750px",
        }}
      >
        <Viewer fileUrl="/reality-canvas.pdf" />
      </div>
    </Layout>
  );
}
