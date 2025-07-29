import express, { urlencoded } from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();


import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import sessionRoutes from './routes/session.routes.js';


const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api/ai',aiRoutes);
app.use('/api/session',sessionRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`)))
  .catch(err => console.log(err));