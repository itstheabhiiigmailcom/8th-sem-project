import Plant from '../models/plant.model.js';
import { v4 as uuidv4 } from 'uuid';
import { uploadToS3 } from '../middlewares/aws_s3.js'; // make sure this exists
// Remove multer — we'll use busboy or multer depending on your preference

export const createPlant = async (req, res) => {
  try {
    const { family, scientificName, collector, country, uses } = req.body;
    const file = req.file; // comes from multer or similar middleware

    // Validate required fields
    if (!family || !scientificName || !collector || !uses || !file) {
      return res.status(400).json({
        status: false,
        message:
          'Missing required fields: family, scientificName, collector, uses, or image file',
      });
    }

    // Optional: check for existing plant with same scientificName
    const existingPlant = await Plant.findOne({ scientificName });
    if (existingPlant) {
      return res.status(409).json({
        status: false,
        message: 'Plant with this scientific name already exists.',
      });
    }

    // Upload file to AWS S3
    const uploadResult = await uploadToS3({
      filePath: file.path,
      fileName: file.originalname,
      mimetype: file.mimetype,
    });

    const imageUrl = uploadResult.Location;
    const plant_id = uuidv4();

    const newPlant = new Plant({
      plant_id,
      family,
      scientificName,
      collector,
      country: country || '',
      uses,
      image: imageUrl, // Use uploaded image URL
    });

    await newPlant.save();

    return res.status(201).json({
      status: true,
      message: 'Plant saved successfully',
      plant: newPlant,
    });
  } catch (error) {
    console.error('Error creating plant:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Server error while saving plant',
    });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const { plant_id } = req.params;

    if (!plant_id) {
      return res.status(400).json({
        status: false,
        message: 'plant_id parameter is required',
      });
    }

    const plant = await Plant.findOne({ plant_id });

    if (!plant) {
      return res.status(404).json({
        status: false,
        message: 'Plant not found with the provided plant_id',
      });
    }

    return res.status(200).json({
      status: true,
      plant,
    });
  } catch (error) {
    console.error('Error fetching plant:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Server error while fetching plant',
    });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Get the file path
    const localFilePath = file.path;
    if (!localFilePath) {
      return res.status(409).json({
        message: 'student Profile is required!',
      });
    }

    // Upload file to AWS S3 using the local file path
    const uploadResult = await uploadToS3({
      filePath: localFilePath,
      fileName: file.originalname, // Maintain the original file name
      mimetype: file.mimetype, // Pass the MIME type for content-type headers
    });

    // Return success response
    return res.status(200).json({
      message: 'File uploaded successfully!',
      fileUrl: uploadResult.Location, // S3 file URL
    });
  } catch (err) {
    console.error('Error uploading file:', err.message);
    return res.status(500).json({
      message: 'Failed to upload file.',
      error: err.message,
    });
  }
};
