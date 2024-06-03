import "dotenv/config";

export default ({ config }) => ({
    ...config,
    extra: {
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryImageUploadApiUrl: process.env.CLOUDINARY_IMAGE_UPLOAD_API_URL,
      nestjsApiRestUrl: process.env.NESTJS_API_REST_URL,
      nestjsApiRestUrlUser : process.env.NESTJS_API_REST_URL_USER,
      "eas": {
        "projectId": "cf621826-b3ba-4b9e-86fb-8530b39004e7"
      }
    },
  });