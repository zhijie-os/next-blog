import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export default function Footer() {
    return (
        <footer>
            <div className="mb-3 flex justify-center space-x-4" >
            <FontAwesomeIcon icon="coffee" color="white"/>
                {/* <FontAwesomeIcon icon="coffee" color="white"></FontAwesomeIcon> */}

                <div>LinkedIn</div>
                <div>
                    <Image
                        src="/mail.svg"
                        alt="logo"
                        width={48}
                        height={48} />

                </div>
                {/* <div></div> */}
            </div>
        </footer>

    )
}