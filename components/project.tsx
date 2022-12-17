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
        <div className="max-w-md mx-auto p-4 md:p-8 rounded shadow-lg bg-white overflow-hidden">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4">{description}</p>
            {youtubeId ? (
                <YouTube
                    videoId={youtubeId}
                    opts={{ height: '78', width: '128' }}
                    className="rounded-md shadow-md h-full w-full object-cover"
                />
            ) : (
                <Image className="rounded-md shadow-md h-full w-full object-cover" 
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