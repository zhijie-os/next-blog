import Layout from "../components/layout";
// import utilStyles from '../styles/utils.module.css';
import Timeline from "../components/timeline";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 720,
    height: 480,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function Home() {
  const size = useWindowSize();

  return (
    <Layout home={true}>
      {/* layout header still work, this adds to the layout header */}
      <div className="w-full text-center">
        <div className="max-w-4xl w-full mx-auto p-2 flex flex-col justify-center items-center">
          <div className="flex flex-col mx-auto">
            {/* <Image
              className="rounded-md pb-10"
              src="/images/openning.webp"
              width={size.width}
              height={size.height}
              alt="eight_six"
            ></Image> */}
            <div className="flex flex-col">
              {/* timeline section */}{" "}
              <div className="col-span-1">
                <Timeline></Timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
