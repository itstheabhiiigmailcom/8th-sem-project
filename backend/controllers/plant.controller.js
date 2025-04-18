import Plant from '../models/plant.model.js';
import { v4 as uuidv4 } from 'uuid';

export const createPlant = async (req, res) => {
  try {
    const { family, scientificName, collector, country, uses, image } =
      req.body;

    // Basic field validation
    if (!family || !scientificName || !collector || !uses || !image) {
      return res.status(400).json({
        status: false,
        message:
          'Missing required fields: family, scientificName, collector, uses, or image',
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
    const plant_id = uuidv4();

    const newPlant = new Plant({
      plant_id,
      family,
      scientificName,
      collector,
      country: country || '', // in case it's undefined
      uses,
      image,
    });

    await newPlant.save();

    return res.status(201).json({
      status: true,
      message: 'Plant saved successfully',
      plant: newPlant,
    });
  } catch (error) {
    console.error('Error saving plant:', error.message);
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
