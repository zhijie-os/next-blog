import Image from "next/image";
import { useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import "yet-another-react-lightbox/styles.css";
import fs from 'fs';
import path from 'path';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";
import ScrollTop from "../components/scrollTop";
import LinkBar from "../components/linkbar";
import {CldImage} from 'next-cloudinary'



function CloudinaryImage({
  photo,
  wrapperStyle,
}) {
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <CldImage src={"photos/"+photo.src} width={photo.width} height={photo.height} alt={photo.src}/>
    </div>
  );
}

export default function ImageGallery({ photos }) {
  const [index, setIndex] = useState(-1);
  const home = false;
  return (
    <div>
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
              <div className="flex ml-2">
                “That which we need the most will be found where we least want
                to look.” - Carl Jung.
              </div>

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
              <div className="flex ml-2">
                “That which we need the most will be found where we least want
                to look.” - Carl Jung.
              </div>
            </div>
          </>
        )}
      </header>

      <PhotoAlbum
        className=""
        layout="rows"
        photos={photos}
        renderPhoto={CloudinaryImage}
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



export async function getStaticProps() {
  try {
    // Define the path to the `images.txt` file
    const filePath = path.join(process.cwd(), '', 'images.txt');
        
    // Read the contents of the `images.txt` file
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Split the content by line and parse each line (format: filename, width, height)
    const photos = data.split('\n').map(line => {
      const [src, width, height] = line.split(',').map(item => item.trim());
      
      if (src && width && height) {
        return {
          src,
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        };
      }
      return null;
    }).filter(Boolean);  // Filter out any null values for invalid lines

    // Reverse the order of the photos array or any other transformation
    return { props: { photos: photos.reverse() } };

  } catch (error) {
    console.error('Error fetching images metadata.', error);
    return { props: { photos: [] } };  // Fallback if something goes wrong
  }
}