import { Router } from 'express';
import Certificate from '../models/Certificate.js';
import Donor from '../models/Donor.js';

const router = Router();

// Issue a certificate for a donor
router.post('/certificates', async (req, res) => {
  try {
    const donor = await Donor.findById(req.body.donorId);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    const certificate = new Certificate({ donorId: donor._id });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all certificates
router.get('/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().populate('donorId');
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
