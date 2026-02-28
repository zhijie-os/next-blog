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
    time: "2019 - 2024",
    event:
      "Bachelor Program with First-class Honours (GPA 3.92/4) in Computer Science at the University of Calgary.",
  },
  {
    time: "April 2022 - September 2023",
    event:
      "Mixed Reality Researcher at Programmable Reality Lab, Calgary, AB, Canada.",
  },
  {
    time: "June 2023 - August 2023",
    event: "Full-stack Developer at New Technologies, Toronto, ON, Canada.",
  },
  {
    time: "September 2023 - September 2024",
    event: "Test & Firmware Developer at Lucid Vision Labs, Richmond, BC, Canada.",
  },
  {
    time: "September 2024 - November 2025",
    event: "AI Infrastructure Engineer at Huawei, Hangzhou, Zhejiang, China.",
  },
  {
    time: "November 2025 - Present",
    event: "Applied RL for LLM Researcher at Huawei, Hangzhou, Zhejiang, China.",
  }
];

export default function Timeline() {
  // Create a reversed copy of the dates array
  const reversedDates = [...dates].reverse();

  return (
    <div className="mx-auto p-3 text-left md:text-center">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {reversedDates.map((item, index) => (
          <li className="mb-5 ml-4" key={index}>
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {item.time}
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-200">
              {item.event}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}