import YouTube from 'react-youtube';
import Image from 'next/image'
import Link from 'next/link'
import { ProjectProps } from '../data/projectData';
import { AiOutlineArrowRight } from 'react-icons/ai'


export default function Project({ title, description, imageUrl, link }: ProjectProps) {
    return (
        // 1 on small, 2 on medium, 4 on large
        <div className="w-full flex flex-col lg:flex-row" >
            {/* Teaser Video or Image  */}
            <div className="lg:w-1/3 h-full overflow-hidden rounded-md ">

                <Image
                    className="rounded object-cover object-center md:h-36 lg:h-48"
                    //! tells TypeScript that even though something looks like it could be null, it can trust you that it's not
                    src={imageUrl!}
                    alt={title}
                    width={544}
                    height={306}
                />
            </div>

            <div className="md:w-2/3 flex flex-col">
                {/* Title */}
                <div className="p-y-6 pl-2">
                    <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                </div>

                <p className="pl-2 prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>

                {/* link to the project */}
                <Link
                    href={link}
                    className="pl-2 text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Link to ${title}`}
                >
                    <div className="flex m"> Learn more <AiOutlineArrowRight className="m-2" /> </div>
                </Link>
            </div>
        </div>
    );
}