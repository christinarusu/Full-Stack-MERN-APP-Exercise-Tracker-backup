import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import exercisesRouter from './routes/exercises.js';

const app = express();

// Dynamic CORS: allow any frontend on Vercel
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (origin.includes("vercel.app")) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

// Mount routes
app.use('/exercises', exercisesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
