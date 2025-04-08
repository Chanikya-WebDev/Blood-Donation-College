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

router.get("/blood-requests", async (req, res) => {
  try {
    // Find all blood requests in the database
    const bloodRequests = await BloodRequest.find();

    // Send the response with the data
    res.status(200).json( bloodRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve blood requests",
    });
  }
});

router.put('/blood-request/:id', async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body; // Get the status from the request body

  try {
    // Check if the blood request exists
    const bloodRequest = await BloodRequest.findById(id);
    if (!bloodRequest) {
      return res.status(404).json({ message: 'Blood request not found.' });
    }

    // Validate the status provided by the admin (accepted or rejected)
    // if (status !== 'accepted' && status !== 'rejected') {
    //   return res.status(400).json({ message: 'Invalid status. Please use "accepted" or "rejected".' });
    // }

    // Update the status of the blood request
    bloodRequest.requestStatus = requestStatus;

    // Save the updated blood request
    await bloodRequest.save();

    return res.status(200).json({ message: `Blood request ${requestStatus} successfully.` });
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


router.post("/blood-requests", upload.single("doctorPrescription"), createBloodRequest);

// export default { createBloodRequest, upload };
export default router;
