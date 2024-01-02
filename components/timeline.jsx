import { useEffect } from "react";

const dates = [
  {
    time: "1999",
    event: "Born in Hangzhou (杭州), China.",
  },
  {
    time: "2019",
    event:
      "Certified in Western Cultures and English at Zhejiang University (浙江大学).",
  },
  {
    time: "2019 - Current",
    event:
      "Bachelor Program with First-class Honours (GPA 3.95/4) in Computer Science at the University of Calgary.",
  },
  {
    time: "April 2022 - Current",
    event:
      "Mixed Reality Researcher at Programmable Reality Lab, Calgary, AB, Canada.",
  },
  {
    time: "June 2023 - August 2023",
    event: "Full-stack Developer at Knowd, Toronto, ON, Canada.",
  },
  {
    time: "Sepetember 2023 - Current",
    event: "Test & Firmware Developer at Lucid Vision Labs, Richmond, BC, Canada.",
  },
  {
    time: "December 2023 - Current",
    event: "CEO & Co-founder at Gladiator Technologies, Calgary, AB, Canada.",
  }
];

export default function Timeline() {

  return (
    <div className="mx-auto p-3 text-left md:text-center">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {dates.map((item, index) => (
          <li className="mb-5 ml-4" key={index}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.time}
            </time>
            {/* <h3 className="text-lg text-gray-900 dark:text-white">University of Calgary</h3> */}
            <p className="text-base  font-normal text-gray-500 dark:text-gray-200">
              {item.event}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
