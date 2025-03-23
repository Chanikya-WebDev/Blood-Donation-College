import BloodRequest from "../models/BloodReq.js";
import multer, { diskStorage } from "multer";
import { extname } from "path";
import { Router } from "express";

const router = Router();

// Configure Multer for file uploads
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Create a new blood request
const createBloodRequest = async (req, res) => {
  try {
    const { name, contact, bloodType, bloodAmount, hospitalName, hospitalAddress } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Doctor's prescription is required" });
    }

    const newRequest = new BloodRequest({
      name,
      contact,
      bloodType,
      bloodAmount,
      doctorPrescription: req.file.path, // Save file path in DB
      hospitalName,
      hospitalAddress,
    });

    await newRequest.save();
    res.status(201).json({ message: "Blood request submitted successfully!", newRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/blood-requests", upload.single("doctorPrescription"), createBloodRequest);

// export default { createBloodRequest, upload };
export default router;
