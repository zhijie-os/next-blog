import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
// import * from '@fortawesome/free-solid-svg-icons'
// import {} from '@fortawesome/fontawesome-svg-core'
import Image from "next/image"

export default function Footer() {
    return (
        <footer>
            <div className="mb-3 flex justify-center space-x-4" >

                <div className="rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <FaGithub size={"32px"} />
                </div>

                <div className="rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <FaLinkedin size={"32px"} />
                </div>

                <div className="rounded-full shadow-lg shadow-gray-400 p-2 cursor-pointer hover:scale-110 ease-in duration-300">
                    <AiFillMail size={"32px"} />
                </div>


            </div>
        </footer>

    )
}