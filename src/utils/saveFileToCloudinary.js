import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVars.js';
import { CLOUDINARY } from '../constants/envVars.js';

const ENABLE_CLOUDINARY = process.env.ENABLE_CLOUDINARY === 'true';

if (ENABLE_CLOUDINARY) {
  cloudinary.v2.config({
    secure: true,
    cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
    api_key: getEnvVar(CLOUDINARY.API_KEY),
    api_secret: getEnvVar(CLOUDINARY.API_SECRET),
  });
}

export const saveFileToCloudinary = async (file) => {
  if (!ENABLE_CLOUDINARY) {
    return `/uploads/${file.filename}`;
  }

  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (err) {
    await fs.unlink(file.path);
    console.error('Cloudinary upload failed:', err);
    throw new Error('Failed to upload file to Cloudinary');
  }
};
