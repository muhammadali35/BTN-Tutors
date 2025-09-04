// routes/analytics.js
import express from 'express';
import Student from '../models/studentModel.js';
import Tutor from '../models/tutorModel.js';
import Service from '../models/serviceModel.js';

const router = express.Router();

// Utility function
const getCountPerMonth = (items, dateField = 'createdAt') => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const currentYear = new Date().getFullYear();

  return months.map((_, index) => {
    const start = new Date(currentYear, index, 1);
    const end = new Date(currentYear, index + 1, 1);
    return items.filter(item => {
      const date = new Date(item[dateField]);
      return date >= start && date < end;
    }).length;
  });
};

// Route
router.get('/summary', async (req, res) => {
  try {
    const [students, tutors, services] = await Promise.all([
      Student.find().select('createdAt'),
      Tutor.find().select('createdAt'),
      Service.find(),
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const studentCounts = getCountPerMonth(students);
    const teacherCounts = getCountPerMonth(tutors);
    const serviceCount = services.length;
    const serviceCounts = months.map(() => serviceCount);

    res.json({
      months,
      students: studentCounts,
      teachers: teacherCounts,
      services: serviceCounts,
    });
  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({
      error: 'Failed to fetch analytics',
      message: err.message,
    });
  }
});

// ✅ یقینی بنائیں کہ آپ یہ لکھ رہے ہیں:
export default router;