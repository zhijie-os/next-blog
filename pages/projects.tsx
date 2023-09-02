import Project from "../components/project";
import Layout from "../components/layout";
import Head from "next/head";
import { ProjectData } from "../data/projectData";

export default function Projects() {
  return (
    <Layout home={false}>
      <Head>
        <title>Projects | Zhijie Xia</title>
      </Head>

      <div className="max-w-4xl flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading- tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-4xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Welcome to my project gallery, here I showcase some of my projects on my way to become a 100X engineer.
          </p>
        </div>

        {/* map each project data to a project card */}
        <div className="container ">
          <div className="m-4 flex flex-col divide-y divide-gray-700">
            {ProjectData.map((p) => (
              <div key={p.title} className='py-4 flex jusitfy-center'>
                <Project
                  title={p.title}
                  description={p.description}
                  link={p.link}
                  imageUrl={p.imageUrl}
                ></Project>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>

  )
}