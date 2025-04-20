import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';

// Generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload
    process.env.JWT_ACCESS_SECRET, // secret key
    {
      expiresIn: '15m', // expire time
    }
  );
};

// Generate a refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

// Registration handler
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === '')) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    // check if user exists
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res
        .status(409)
        .json({ success: false, message: 'User with email already exists' });
    }

    const user_id = uuidv4();

    const user = await User.create({
      user_id,
      fullName,
      email,
      password,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    const createdUser = await User.findById(user._id).select(
      '-password -refreshToken'
    );

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while registering the user',
      });
    }

    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: 'User registered and logged in successfully!',
        data: createdUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('email : ', email);
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();
    // Send tokens to the client
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false, // Secure is false for localhost
        sameSite: 'Lax', // Use Lax for local testing; can use Strict in production
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

// Refreshing the access token with the help of refreshToken
// even this refreshToken can also expires after fixed long term
const refreshTheToken = async (req, res) => {
  // const { refreshTokenFromBody } = req.body;
  const refreshTokenFromCookie = req.cookies.refreshToken;

  const refreshToken = refreshTokenFromCookie;
  if (!refreshToken)
    return res.status(403).json({ message: 'Refresh token is required' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Verify the refresh token exists in the database
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user._id);
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export { login, register, refreshTheToken };
