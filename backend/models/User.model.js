import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String, default: "" },
    country: { type: String },
    role: { type: String, enum: ["Investor", "Organisation"], required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    // walletAddress: { type: String },  // Added for RainbowKit wallet integration
    analytics: { type: String },  // Added for detailed analytics
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
