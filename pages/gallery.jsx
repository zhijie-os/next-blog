import Image from "next/image";
import { useState } from "react";
import { RenderPhotoProps } from "react-photo-album";
import { PhotoAlbum } from "react-photo-album";
import "yet-another-react-lightbox/styles.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Layout from '../components/layout'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";
import ScrollTop from "../components/scrollTop";

const photos = [
    { src: "/photos/37.jpg", width: 4032, height: 2268 },
    { src: "/photos/36.jpg", width: 2268, height: 4032 },
    { src: "/photos/35.jpg", width: 1440, height: 1080 },
    { src: "/photos/34.jpg", width: 4032, height: 3024 },
    { src: "/photos/33.jpg", width: 2268, height: 4032 },
    { src: "/photos/32.jpg", width: 1440, height: 1080 },
    { src: "/photos/31.jpg", width: 4032, height: 3024 },
    { src: "/photos/30.jpg", width: 2688, height: 1512 },
    { src: "/photos/29.jpg", width: 1512, height: 2688 },
    { src: "/photos/28.jpg", width: 2268, height: 4032 },
    { src: "/photos/27.jpg", width: 4032, height: 2268 },
    { src: "/photos/26.jpg", width: 4032, height: 2268 },
    { src: "/photos/25.jpg", width: 4032, height: 2268 },
    { src: "/photos/24.jpg", width: 2268, height: 4032 },
    { src: "/photos/23.jpg", width: 4032, height: 2268 },
    { src: "/photos/22.jpg", width: 2268, height: 4032 },
    { src: "/photos/21.jpg", width: 4032, height: 2268 },
    { src: "/photos/20.jpg", width: 2268, height: 4032 },
    { src: "/photos/19.jpg", width: 4032, height: 2268 },
    { src: "/photos/18.jpg", width: 2268, height: 4032 },
    { src: "/photos/17.jpg", width: 4032, height: 2268 },
    { src: "/photos/16.jpg", width: 4032, height: 2268 },
    { src: "/photos/15.jpg", width: 4032, height: 2268 },
    { src: "/photos/14.jpg", width: 2268, height: 4032 },
    { src: "/photos/13.jpg", width: 1080, height: 1440 },
    { src: "/photos/12.jpeg", width: 4032, height: 3024 },
    { src: "/photos/11.jpeg", width: 4032, height: 3024 },
    { src: "/photos/10.jpeg", width: 4032, height: 3024 },
    { src: "/photos/9.jpeg", width: 4032, height: 3024 },
    { src: "/photos/8.jpg", width: 1440, height: 1080 },
    { src: "/photos/7.jpg", width: 1080, height: 1440 },
    { src: "/photos/6.jpg", width: 1440, height: 1080 },
    { src: "/photos/5.jpg", width: 1080, height: 1440 },
    { src: "/photos/4.jpg", width: 1440, height: 1080 },
    { src: "/photos/3.jpg", width: 750, height: 745 },
    { src: "/photos/2.webp", width: 1600, height: 2133 },
    { src: "/photos/1.jpg", width: 1080, height: 1440 },
]


function NextJsImage({
    photo,
    imageProps: { alt, title, sizes, className, onClick },
    wrapperStyle,
}) {
    return (
        <div style={{ ...wrapperStyle, position: "relative" }}>
            <Image
                // fill
                src={photo}
                placeholder={"blurDataURL" in photo ? "blur" : undefined}
                {...{ alt, title, sizes, className, onClick }}
            />
        </div>
    );
}


export default function ImageGallery() {
    const [index, setIndex] = useState(-1)
    const home = false

    return (
        <div >
            <Navbar></Navbar>
            <header className="flex justify-center mb-4">
                {home ? (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center m-1">
                                <Image
                                    priority
                                    src="/images/avatar.jpg"
                                    className="rounded-full"
                                    height={144}
                                    width={144}
                                    alt=""
                                ></Image>
                            </div>
                            <div className="flex ml-2">“That which we need the most will be found where we least want to look.” -  Carl Jung.</div>

                            <LinkBar></LinkBar>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center m-1">
                                <Link href="/">
                                    <Image
                                        priority
                                        className="rounded-full"
                                        src="/images/avatar.png"
                                        height={88}
                                        width={88}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="flex ml-2">“That which we need the most will be found where we least want to look.” -  Carl Jung.</div>
                        </div>
                    </>
                )
                }
            </header>

            <PhotoAlbum
                className=""
                layout="rows"
                photos={photos}
                renderPhoto={NextJsImage}
                sizes={{
                    size: "calc(100vw - 40px)",
                    sizes: [
                        { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
                        { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
                        { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
                    ],
                }}
                onClick={({ index }) => setIndex(index)}
            />

            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />


            <ScrollTop></ScrollTop>
            <div className="mt-4">
                <Footer></Footer>
            </div>
        </div>
    );
}


