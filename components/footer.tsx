import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='flex flex-col'>
            <div className="mb-3 flex justify-center space-x-4" >
                {/* github */}
                <div className="rounded-full shadow-md shadow-gray-400 hover:shadow-gray-600 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <a href="https://github.com/zhijie-os" target="_blank" rel="noreferrer"><FaGithub size={"32px"} /></a>
                </div>
                {/* linkedin */}
                <div className="rounded-full shadow-md shadow-gray-400 hover:shadow-gray-600 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <a href="https://www.linkedin.com/in/zhijie-xia-678b331b5/" target="_blank" rel="noreferrer"><FaLinkedin size={"32px"} /></a>
                </div>
                {/* email  */}
                <div className="rounded-full shadow-md shadow-gray-400 hover:shadow-gray-600 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <a href="mailto:zhijiexiacs@gmail.com"><AiFillMail size={"32px"} /></a>
                </div>
            </div>

            <div className="flex justify-center mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div>Zhijie Xia</div>
                <div>{` • `}</div>
                <div>{`© ${new Date().getFullYear()}`}</div>
                <div>{` • `}</div>
                <Link href="/">zhijiexia.dev</Link>
            </div>

        </footer>

    )
}