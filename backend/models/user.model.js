import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  visitedPlants: [
    {
      plant_id: {
        type: String,
        required: true,
      },
      visitCount: {
        type: Number,
        default: 1,
      },
    },
  ],
  refreshToken: { type: String }, // Store the latest refresh token
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip hashing if password hasn't changed
  this.password = await bcrypt.hash(this.password, 10); // hash the password with salt of 10
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
