import User from '../models/user.model.js';

export const trackPlantVisit = async (req, res) => {
  try {
    const { user_id, plant_id } = req.body;

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const visitIndex = user.visitedPlants.findIndex(
      (p) => p.plant_id === plant_id
    );

    if (visitIndex !== -1) {
      user.visitedPlants[visitIndex].count += 1;
    } else {
      user.visitedPlants.push({ plant_id, count: 1 });
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: 'Plant visit tracked successfully',
      visitedPlants: user.visitedPlants,
    });
  } catch (error) {
    console.error('Error tracking plant visit:', error.message);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};
