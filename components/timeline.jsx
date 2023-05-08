export default function Timeline() {
    return (
        <div className="mx-auto p-3">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 1999</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">I was born</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Hangzhou</p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2019 - Current</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">University of Calgary</h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Major in Computer Science</p>
                </li>
                {/* <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2022</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code in Tailwind CSS</h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                </li> */}
            </ol>
        </div>
    )
}