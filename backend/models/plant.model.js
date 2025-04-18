import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
  {
    plant_id: {
      type: String,
      required: true,
      unique: true,
    },
    family: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
      unique: true, // Optional: ensures no duplicates
    },
    collector: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: '', // Allows it to be empty
    },
    uses: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL or file path
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
