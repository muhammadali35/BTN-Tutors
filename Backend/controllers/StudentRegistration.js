import studentModel from '../models/studentModel.js';
import bcrypt from 'bcrypt';

export const stuRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      city,
      address,
      school,
      tuitionMode,
      subjects,
      otherSubjects,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !city ||
      !address ||
      !school ||
      !tuitionMode ||
      !subjects
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Check email already exists
    const existingEmail = await studentModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create student
    const register = await studentModel.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      city,
      address,
      school,
      tuitionMode,
      subjects,
      otherSubjects,
    });

    res.status(201).json({
      message: 'Student registered successfully',
      student: register,
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getStudents=async(req,res)=>{
 const findStudent=await studentModel.find()

  if (!findStudent || findStudent.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
     res.json({
      count:findStudent.length,
      message: "Students fetched successfully",
      findStudent
     })
 }


// ✅ Update student status
export const updateStudentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const student = await studentModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: `Student ${status}`, student });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};




// ✅ Delete Student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student" });
  }
};