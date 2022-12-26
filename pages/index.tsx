import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css';
export default function Home() {
  return (
    <Layout home={true}>
      {/* layout header still work, this adds to the layout header */}

      <section className={utilStyles.headingMd}>
        
        <p>Zhijie Xia is a undergraduate student and researcher at University of Calgary.</p>
        <p>
        As a student majored in Computer Science at
        University of Calgary, Zhijie received multiple scholarships 
        and awards for his 
        outstanding academic performance.
        He has taken most of essential computer science 
        such as Operating System, Algorithm & Date Structure, 
        Compiler Construction, Computer Network, Network Security, 
        System Security and etc. He is ready to apply his skills 
        in the field of software engineering and looking for 
        FOSS project to contribute.
        </p>

        <p>
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
        he submitted the system as a research paper to ACM SIGCHI 2023.
        </p>
      </section>
    </Layout>
  )
}
