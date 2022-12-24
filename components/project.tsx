import YouTube from 'react-youtube';
import Image from 'next/image'

type ProjectProps = {
    title: string;
    description: string;
    imageUrl?: string;
    youtubeId?: string;
}

export default function Project({ title, description, imageUrl, youtubeId }: ProjectProps) {
    return (
        <div className="container w-72 md:w-1/2 flex flex-col border-2 border-purple-800 rounded shadow-lg bg-grey overflow-visible">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{description}</p>

            {youtubeId ? (
                <YouTube
                    videoId={youtubeId}
                    opts={{ height: '195', width: '390' }}
                    className="shrink rounded-md shadow-md w-full"
                />
            ) : (
                <Image className="shrink rounded-md shadow-md w-full" 
                //! tells TypeScript that even though something looks like it could be null, it can trust you that it's not
                src={imageUrl!} 
                alt={title}  
                width='78'
                height='128'
                />
            )}
        </div>
    );
}