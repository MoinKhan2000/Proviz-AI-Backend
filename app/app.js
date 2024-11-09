import '../config/dotenv.config.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from '../src/user/routes/user.routes.js';
import cors from 'cors';
import applicationRouter from '../src/user/routes/application.routes.js';


const app = express();

// Middleware Setup
// Parse incoming JSON requests
app.use(express.json());

// Parse cookies from the request headers
app.use(cookieParser());

// Handle URL query parameters
app.use(express.query());

// CORS Configuration
app.use(cors({
  credentials: true, // Allow cookies to be sent with requests
  origin: process.env.ALLOWED_ORIGIN, // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers in requests
}));

// Route Configuration
// Base route for user-related API endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/applications', applicationRouter)

export default app;
