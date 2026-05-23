import { useState, useMemo } from "react";
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
import Layout from "../components/layout";
import { CldImage } from 'next-cloudinary';
import { siteUrl } from "../components/layout";

const PAGE_SIZE = 20;
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demudihnm';

function cloudinaryUrl(publicId, { width, quality = 'auto' } = {}) {
  const transforms = ['f_auto', `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/photos/${publicId}`;
}

function CloudinaryImage({ photo, layout, wrapperStyle }) {
  const displayWidth = Math.round(Math.min(layout?.width || photo.width, 800));
  const displayHeight = layout?.height
    ? Math.round((layout.height / layout.width) * displayWidth)
    : Math.round((photo.height / photo.width) * displayWidth);

  return (
    <div style={{ ...wrapperStyle, position: "relative", backgroundColor: '#f5f5f5' }}>
      <CldImage
        src={"photos/" + photo.src}
        width={displayWidth}
        height={displayHeight}
        alt={photo.src}
        crop="fill"
        gravity="auto"
        loading="lazy"
      />
    </div>
  );
}

export default function ImageGallery({ photos }) {
  const [index, setIndex] = useState(-1);
  const [allPhotos, setAllPhotos] = useState(photos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(photos.length >= PAGE_SIZE);

  // High-res slides for lightbox
  const lightboxSlides = useMemo(() =>
    allPhotos.map((p) => ({
      src: cloudinaryUrl(p.src, { width: 1600, quality: 'best' }),
      width: p.width,
      height: p.height,
    })),
    [allPhotos]
  );

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/photos?page=${page + 1}&limit=${PAGE_SIZE}`);
      const data = await res.json();
      if (data.photos && data.photos.length > 0) {
        setAllPhotos((prev) => [...prev, ...data.photos]);
        setPage((p) => p + 1);
        setHasMore(data.photos.length >= PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error('Failed to load more photos', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      metaTitle="Gallery | Zhijie Xia"
      metaDescription="Photo gallery by Zhijie Xia."
      canonical={`${siteUrl}/gallery`}
      showMiniAvatar
    >
      <section className="py-8">
        <h1 className="section-heading">Gallery</h1>

        <PhotoAlbum
          layout="rows"
          photos={allPhotos}
          renderPhoto={CloudinaryImage}
          targetRowHeight={280}
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

        {hasMore && (
          <div className="flex justify-center py-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-2 rounded-lg text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        <Lightbox
          slides={lightboxSlides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), '', 'images.txt');
    const data = fs.readFileSync(filePath, 'utf8');

    const photos = data.split('\n').map(line => {
      const [src, width, height] = line.split(',').map(item => item.trim());
      if (src && width && height) {
        return { src, width: parseInt(width, 10), height: parseInt(height, 10) };
      }
      return null;
    }).filter(Boolean);

    return { props: { photos: photos.reverse() } };
  } catch (error) {
    console.error('Error fetching images metadata.', error);
    return { props: { photos: [] } };
  }
}
