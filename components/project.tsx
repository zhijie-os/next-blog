import Image from 'next/image'
import { ProjectProps } from '../data/projectData';

export default function Project({ title, description, imageUrl, link, venue, date }: ProjectProps) {
    return (
        <div className="group">
            <a href={link} target="_blank" rel="noreferrer" className="hover:no-underline">
                <div className="overflow-hidden rounded-lg mb-2">
                    <Image
                        className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        src={imageUrl!}
                        alt={title}
                        width={600}
                        height={340}
                    />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    {venue && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">{venue}</span>
                    )}
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {description}
                    </p>
                </div>
            </a>
        </div>
    );
}
