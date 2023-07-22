import Layout from "../components/layout";
// import utilStyles from '../styles/utils.module.css';
import Timeline from "../components/timeline";
import Link from "next/link";

export default function Home() {
  return (
    <Layout home={true}>
      {/* layout header still work, this adds to the layout header */}
      <div className="w-full text-center">
        <div className="max-w-4xl w-full mx-auto p-2 flex flex-col justify-center items-center">
          <div className="flex flex-col mx-auto">
            {/* introduction section  */}
            <h1 className="text-4xl py-2 font-bold">
              <span className="text-cyan-500">Zhijie Xia</span> is an
              undergraduate student, researcher at{" "}
              <Link className="underline" href={"https://www.ucalgary.ca/"}>
                University of Calgary
              </Link>
              , and full stack software engineer at{" "}
              <Link className="underline" href="https://www.knowd.ai/">
                Knowd
              </Link>
              .
            </h1>

            {/* student section  */}
            <p className="py-4 text-center">
              As an exceptional Computer Science major at the University of
              Calgary, Zhijie has received multiple scholarships and awards for
              his outstanding academic performance. He has explored a diverse
              range of essential courses, such as Operating Systems, Algorithm &
              Data Structure, Compiler Construction, Computer Networks, Network
              Security, and System Security. Eager to apply his well-honed
              skills in software engineering, he seeks exciting opportunities to
              contribute to FOSS projects.
            </p>

            {/* research section */}
            <p className="py-4 text-center">
              In the realm of research, Zhijie focuses on two compelling areas:
              System Security and Mixed Reality. Under the expert guidance of
              Dr. Joel Reardon and Dr. Ryo Suzuki, respectively, he has made
              significant strides in his investigations. One notable achievement
              is his co-authorship of the paper{" "}
              <Link
                className="underline"
                href="https://drive.google.com/file/d/1A1r61O4RwECgX0xsq2rJ8P3FBne6VXTL/view?usp=drive_link"
              >
                RealityCanvas
              </Link>
              , presented at the prestigious UIST 2023 conference.
            </p>

            {/* developer section */}
            <p className="py-4 pb-6 text-center">
              Having embarked on a career as a software engineer, Zhijie has
              already gained valuable experience at a dynamic startup company
              based in Toronto. This opportunity allowed him to collaborate with
              a myriad of interesting and competent professionals, providing him
              with an invaluable taste of the tech industry&rsquo;s vibrancy and
              innovation.
            </p>
          </div>

          <Timeline></Timeline>
        </div>
      </div>
    </Layout>
  );
}
