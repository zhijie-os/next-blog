import Link from "next/link";
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { AiFillMail, AiFillFilePdf } from 'react-icons/ai'

export default function LinkBar() {
    return (
        <div className="p-2 max-w-xl flex justify-center">
            {/* github */}
            <a className="mx-1 flex flex-col items-center" href={"/Zhijie_Xia_UCalgary_Resume.pdf"} target="_blank" rel="noreferrer">
                <AiFillFilePdf size={"24px"} />
                Resume
                {/* <div></div> */}
            </a>

            {/* github */}
            <a className="mx-1 flex flex-col items-center" href="https://github.com/zhijie-os" target="_blank" rel="noreferrer">
                <FaGithub size={"24px"} />
                GitHub
            </a>

            {/* linkedin */}
            <a className="mx-1 flex flex-col items-center" href="https://www.linkedin.com/in/zhijie-xia-678b331b5/" target="_blank" rel="noreferrer">
                <FaLinkedin size={"24px"} />
                LinkedIn
            </a>

            {/* email  */}
            <a className="mx-1 flex flex-col items-center" href="mailto:zhijiexiacs@gmail.com">
                <AiFillMail size={"24px"} />
                Email
            </a>

        </div>
    )
}