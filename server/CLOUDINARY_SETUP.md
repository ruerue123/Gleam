# Cloudinary Setup for Image Uploads

## Quick Start

The image upload endpoint is now available at `/api/upload`. To use it, you need to configure Cloudinary credentials.

## Steps to Configure Cloudinary

1. **Create a Cloudinary Account**
   - Go to https://cloudinary.com
   - Sign up for a free account

2. **Get Your Credentials**
   - After logging in, go to your Dashboard
   - You'll see:
     - Cloud Name
     - API Key
     - API Secret

3. **Add Credentials to `.env` File**
   - Open `/server/.env`
   - Add or update these lines:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Restart the Server**
   ```bash
   cd server
   npm run dev
   ```

## API Endpoints

### Upload Single Image
- **Endpoint:** `POST /api/upload/single`
- **Headers:** `Authorization: Bearer {token}` (Admin only)
- **Body:** `multipart/form-data` with field name `image`
- **Response:**
  ```json
  {
    "message": "Image uploaded successfully",
    "url": "https://res.cloudinary.com/...",
    "publicId": "gleam-products/..."
  }
  ```

### Upload Multiple Images
- **Endpoint:** `POST /api/upload/multiple`
- **Headers:** `Authorization: Bearer {token}` (Admin only)
- **Body:** `multipart/form-data` with field name `images` (up to 10 files)
- **Response:**
  ```json
  {
    "message": "Images uploaded successfully",
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "publicId": "gleam-products/..."
      }
    ]
  }
  ```

### Delete Image
- **Endpoint:** `DELETE /api/upload/:publicId`
- **Headers:** `Authorization: Bearer {token}` (Admin only)
- **Response:**
  ```json
  {
    "message": "Image deleted successfully"
  }
  ```

## Features

- ✅ Automatic image optimization
- ✅ Images resized to max 1000x1000px
- ✅ Stored in 'gleam-products' folder
- ✅ File size limit: 5MB per image
- ✅ Supports: JPG, PNG, JPEG, WEBP
- ✅ Admin authentication required

## Notes

- Free Cloudinary plan includes 25GB storage and 25GB bandwidth per month
- Images are automatically optimized for web delivery
- All images are stored in the `gleam-products` folder in your Cloudinary account
