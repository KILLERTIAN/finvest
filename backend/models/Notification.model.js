import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    type: { type: String, required: true }, // e.g., "comment", "transaction", etc.
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
