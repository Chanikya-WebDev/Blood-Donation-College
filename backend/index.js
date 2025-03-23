import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import donorRoutes from './routes/donors.js';
import certificateRoutes from './routes/certificates.js';
import bloodRequestRoutes from "./routes/bloodReq.js";
import path from "path";
import { fileURLToPath } from 'url';

// Load environment variables
config();

// Import routes

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(json()); // to parse JSON bodies

// Routes
app.use('/api', donorRoutes);
app.use('/api', certificateRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files
app.use("/api", bloodRequestRoutes);

// Connect to MongoDB
connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
