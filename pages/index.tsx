import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/layout'
// import utilStyles from '../styles/utils.module.css';
import Timeline from '../components/timeline'

export default function Home() {
  return (
    <Layout home={true}>



      {/* layout header still work, this adds to the layout header */}
      <div className="w-full text-center">
        <div className="max-w-4xl w-full mx-auto p-2 flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col mx-auto">
            <h1 className="text-4xl py-2 font-bold">
              <span className="text-cyan-500">Zhijie Xia</span> is an undergraduate student and researcher at University of Calgary.
            </h1>
            <p className="py-4 text-center">
              As a student majors in Computer Science at
              University of Calgary, Zhijie received multiple scholarships
              and awards for his
              outstanding academic performance.
              He has taken most of essential computer science courses
              such as Operating System, Algorithm&Data Structure,
              Compiler Construction, Computer Network, Network Security,
              System Security and etc. He is ready to apply his skills
              in the field of software engineering and looking for
              FOSS projects to contribute.
            </p>

            <p className="py-4 text-center">
              As a researcher,
              Zhijie&rsquo;
              research interests are System
              Security and Mixed Reality.
              Currently, he is supervised
              by Dr. Joel Reardon on an
              Android Permission System project.
              During the previous summer,
              he was supervised by Dr. Ryo Suzuki at
              Programmble Reality Lab at University of Calgary.
              He developed an AR-sketching system called RealityCanvas
              to allow users to create animation in real-time with ease. Moreover,
              he submitted the system to ACM SIGCHI 2023 as leading author.
            </p>
          </div>

          {/* <Timeline></Timeline>  */}
        </div>
      </div>
    </Layout>
  )
}
