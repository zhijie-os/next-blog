import YouTube from 'react-youtube';
import Image from 'next/image'
import Link from 'next/link'
import { ProjectProps } from '../data/projectData';

export default function Project({ title, description, imageUrl, link }: ProjectProps) {
    return (
        // 1 on small, 2 on medium, 4 on large
        <div className="md p-4 md:w-1/2 lg:w-1/3" style={{ maxWidth: '544px' }}>
            {/* Teaser Video or Image  */}
            <div className="h-full overflow-visible rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">

                <Image
                    className="object-cover object-center md:h-36 lg:h-48"
                    //! tells TypeScript that even though something looks like it could be null, it can trust you that it's not
                    src={imageUrl!}
                    alt={title}
                    width={544}
                    height={306}
                />
                {/* Title */}
                <div className="p-6">
                    <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
                </div>

                <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>

                {/* link to the project */}
                <Link
                    href={link}
                    className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Link to ${title}`}
                >
                    Learn more &rarr;
                </Link>
            </div>
        </div>
    );
}