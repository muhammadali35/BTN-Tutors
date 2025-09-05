// src/models/fee.model.js
import mongoose, { Schema } from "mongoose";

// src/models/fee.model.js
const feeSchema = new Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    studentName: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Unpaid', 'Pending'], default: 'Unpaid' },
    paymentDate: { type: Date }, // ✅ When paid
    dueDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true } // ✅ createdAt, updatedAt
);
export default mongoose.model("Fee", feeSchema);