import { Router } from 'express';
import Donor from '../models/Donor.js'; // Import Donor model correctly
import {v4 as uuidv4} from "uuid";

const router = Router();

// Create a new donor
router.post('/donors', async (req, res) => {
  try {
    let newData={...req.body,donorId:uuidv4()};
    const donor = new Donor(newData);
    await donor.save();
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all donors
router.get('/donors', async (req, res) => {
  try {
    const donors = await Donor.find(); // Use Donor.find() directly
    //     const existingNullDonor = await Donor.findOne({ donorId: null });
    // console.log(existingNullDonor); // Check if there's an existing entry with null donorId

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single donor by ID
router.get('/donors/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id); // Use Donor.findById() directly
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
