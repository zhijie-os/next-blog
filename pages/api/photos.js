import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'photos/',
      max_results: limit,
    });

    const photos = result.resources.map((r) => ({
      src: r.public_id.replace('photos/', ''),
      width: r.width,
      height: r.height,
    }));

    res.status(200).json({ photos, next_cursor: result.next_cursor });
  } catch (error) {
    console.error('Error fetching photos from Cloudinary:', error);
    res.status(500).json({ photos: [], error: 'Failed to fetch photos' });
  }
}
