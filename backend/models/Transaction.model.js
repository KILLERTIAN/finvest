import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project model
    contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model (contributor)
    amount: { type: Number, required: true }, // Transaction amount
    transactionHash: { type: String, required: true }, // Blockchain transaction hash
    network: { type: String, enum: ['Ethereum', 'Sepolia', 'Polygon', 'Binance'], required: true }, // Added more options for network
    status: { type: String, enum: ["pending", "confirmed", "failed"], required: true }, // Transaction status
    usdValue: { type: Number }, // Optional field for USD value of the contribution
    gasFees: { type: Number }, // Optional field for recording gas fees
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
