import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Secret keys for JWT
const ACCESS_TOKEN_SECRET = process.env.ACCESS_SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_SECRET_KEY;
const TOKEN_EXPIRATION_TIME = '15m';
const REFRESH_TOKEN_EXPIRATION_TIME = '7d'; 

// Generate access and refresh tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME });
    return { accessToken, refreshToken };
};

// User signup
export const signup = async (req, res) => {
    const { name, email, password, country, role, profileImage } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create new user
        const newUser = new User({ name, email, password, country, role, profileImage });
        await newUser.save();

       // Generate tokens
       const { accessToken, refreshToken } = generateTokens(newUser);
       newUser.accessToken = accessToken;
        newUser.refreshToken = refreshToken;
        await newUser.save();

        // Set cookies for tokens
        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     // secure: true,
        //     maxAge: 15 * 60 * 1000, // 15 minutes
        // });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     // secure: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        

        res.status(201).json({ user: newUser, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up user', error });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists and select password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user);
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();

        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     // secure: true,
        //     maxAge: 15 * 60 * 1000,
        // });
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     // secure: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};

// Refresh token
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

        jwt.verify(refreshToken, REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            const user = await User.findById(decoded.userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
            user.accessToken = accessToken;
            user.refreshToken = newRefreshToken;
            await user.save();

            // res.cookie('accessToken', accessToken, {
            //     httpOnly: true,
            //     // secure: true,
            //     maxAge: 15 * 60 * 1000,
            // });
            // res.cookie('refreshToken', newRefreshToken, {
            //     httpOnly: true,
            //     // secure: true,
            //     maxAge: 7 * 24 * 60 * 60 * 1000,
            // });

            res.status(200).json({ accessToken, refreshToken: newRefreshToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error refreshing token', error });
    }
};

// User logout
export const logout = async (req, res) => {
    try {
        // Extract the refresh token from request body
        const { refreshToken } = req.body;  // Ensure this matches the request format

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not provided' });
        }

        // Find the user associated with the refresh token
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear tokens from user document
        user.accessToken = null;
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Error logging out user', error });
    }
};

