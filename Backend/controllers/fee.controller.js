// src/controllers/fee.controller.js
import mongoose from 'mongoose';
import Fee from "../models/fee.model.js";
import Student from "../models/studentModel.js"; // ✅ Correct import

// src/controllers/fee.controller.js
export const addFee = async (req, res) => {
  const { studentId, month, year, amount, dueDate, notes } = req.body;

  console.log("📥 Received:", { studentId, month, year, amount, dueDate });

  // ✅ Validate required fields
  if (!studentId || !month || !year || !amount || !dueDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // ✅ Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid Student ID format" });
  }

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      console.log("❌ Student NOT found for ID:", studentId);

      // ✅ Debug: Sab students dikhao
      const allStudents = await Student.find().select('_id name email');
      console.log("📋 All Students:", allStudents);
      
      return res.status(404).json({ message: "Student not found. Please check the ID." });
    }

    console.log("✅ Student FOUND:", student.name);

    // ✅ Check duplicate fee
    const existingFee = await Fee.findOne({ studentId, month, year });
    if (existingFee) {
      return res.status(400).json({ message: `Fee for ${month} ${year} already exists` });
    }

    // ✅ Save fee
    const newFee = new Fee({
      studentId,
      studentName: student.name, // ✅ `student.name` use karein
      month,
      year,
      amount,
      dueDate,
      notes,
      status: 'Unpaid',
    });

    await newFee.save();
    res.status(201).json({ message: "Fee added successfully", fee: newFee });
  } catch (error) {
    console.error("💥 Error in addFee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Baaki functions same rehne den
export const getFeesByStudent = async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId }).sort({ year: -1, month: 1 });
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch fees" });
  }
};

export const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ year: -1, month: 1 });
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch fees" });
  }
};




// ✅ Edit Fee
export const updateFee = async (req, res) => {
  const { id } = req.params;
  const { amount, status, dueDate, paymentDate, notes } = req.body;

  try {
    const fee = await Fee.findByIdAndUpdate(
      id,
      { amount, status, dueDate, paymentDate, notes },
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    res.status(200).json({ message: "Fee updated successfully", fee });
  } catch (error) {
    console.error("Error updating fee:", error);
    res.status(500).json({ message: "Failed to update fee" });
  }
};

// ✅ Delete Fee
export const deleteFee = async (req, res) => {
  const { id } = req.params;

  try {
    const fee = await Fee.findByIdAndDelete(id);
    if (!fee) {
      return res.status(404).json({ message: "Fee not found" });
    }

    res.status(200).json({ message: "Fee deleted successfully" });
  } catch (error) {
    console.error("Error deleting fee:", error);
    res.status(500).json({ message: "Failed to delete fee" });
  }
};