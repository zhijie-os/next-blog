const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure your Cloudinary credentials
cloudinary.config({
  cloud_name: 'demudihnm',  // replace with your Cloudinary cloud name
  api_key: '269287813223569',        // replace with your Cloudinary API key
  api_secret: 'gZuYvJ7eT5ASQRLSchkWtALhiis',  // replace with your Cloudinary API secret
});

async function fetchCloudinaryImages() {
  try {
    const folder = 'photos'; // Cloudinary folder where images are stored

    // Fetch resources (images) from the specified folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,    // Only list files under the 'photos/' folder
      max_results: 500,  // Fetch up to 500 files in one request
    });

    // Extract filenames, width, and height from each image
    const images = result.resources.map(resource => ({
      filename: resource.public_id.replace(`${folder}/`, ''), // Extract the filename
      width: resource.width,
      height: resource.height,
    }));

    // Write the fetched data to images.txt
    const filePath = path.join(process.cwd(), 'images.txt');
    const fileContent = images.map(img => `${img.filename}, ${img.width}, ${img.height}`).join('\n');

    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log('Images metadata written to images.txt');
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
  }
}

// Run the function
fetchCloudinaryImages();
