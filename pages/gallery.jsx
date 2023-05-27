import Image from "next/image"
import { useState } from "react"


export default function Gallery({images}) {
    return (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {/* <Image  className="group-hover:opacity-75"    
                        src="/images/avatar.png"
                        width={500}
                        height={500}
                        alt=""
                        /> */}
                {images.map((image)=>(
                    <BlurImage key={image.id} image={image}></BlurImage>
                ))}
            </div>
        </div>
    )
}

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

function BlurImage({image}) {
    const [isLoading, setLoading] = useState(true)

    return (
        <a href={image.href} className="group">
            <div className="aspect-w-1 aspect-h-1 
                xl:aspect-w-7 xl:aspect-h-8 w-full
                overflow-hidden rounded-lg bg-gray-200">
                <Image alt=""
                    src={image.imageSrc}
                    className={cn("group-hover:opacity-75 duration-700 ease-in-out",
                     isLoading ? 'grayscale blur-2xl scale-110': 'grayscale-0 blur-0 scale-100')}
                    layout="fill"
                    objectFit="cover"
                    onLoadingComplete={() => setLoading(false)}
                    ></Image>    
            </div>
            <h3 className="mt-4 text-sm">Zhijie Xia</h3>
            <p className="mt-1 text-lg font-medium">@ZhijieXia</p>
        </a>
    )
}