import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import donorRoutes from './routes/donors.js';
import certificateRoutes from './routes/certificates.js';

// Load environment variables
config();

// Import routes

const app = express();

// Middleware
app.use(cors());
app.use(json()); // to parse JSON bodies

// Routes
app.use('/api', donorRoutes);
app.use('/api', certificateRoutes);

// Connect to MongoDB
connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
