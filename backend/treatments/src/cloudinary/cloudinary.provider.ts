import { v2 } from 'cloudinary';

//This is a setup for the Cloudinary

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SERCRET,
    });
  },
};
