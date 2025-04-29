import cloudinary
import cloudinary.uploader
from app.core.config import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)

def upload_image_to_cloudinary(file):
    try:
        result = cloudinary.uploader.upload(file.file, folder="blogi/uploads")
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"]
        }
    except Exception as e:
        raise Exception("Image upload failed") from e
    

def delete_image_from_cloudinary(public_id: str):
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        raise Exception("Image deletion failed") from e

