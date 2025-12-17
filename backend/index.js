import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { config } from './config/config.js';
import { errorHandler } from './middleware/error.middleware.js';
import { validateRegister, validateLogin, validateTest } from './middleware/validation.middleware.js';
import * as registerC from "./controller/registerC.js";
import * as testC from "./controller/testC.js";
import * as userC from './controller/userC.js';
import * as testSessionC from './controller/testSessionC.js';
import { authMiddleware } from './middleware/auth.middleware.js';

const app = express();

mongoose
  .connect(config.mongoUri)
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: config.clientUrl,
  })
);

// API v2 routes
const API_PREFIX = '/api/v2';

app.post(`${API_PREFIX}/auth/register`, validateRegister, registerC.register);
app.post(`${API_PREFIX}/auth/login`, validateLogin, registerC.login);
app.post(`${API_PREFIX}/auth/logout`, registerC.logout);

app.post(`${API_PREFIX}/user/test/:id`, validateTest, testC.createTest);
app.post(`${API_PREFIX}/user/complete/:user_id`, testC.completedTest);
app.get(`${API_PREFIX}/tests/:id`, testC.getOneTest);
app.get(`${API_PREFIX}/tests`, testC.getTests);
app.delete(`${API_PREFIX}/tests/:id`, testC.deleteTest);

// Test session routes
app.post(`${API_PREFIX}/tests/:id/session/start`, authMiddleware, testSessionC.startTestSession);
app.get(`${API_PREFIX}/tests/:id/session`, authMiddleware, testSessionC.getTestSession);
app.put(`${API_PREFIX}/tests/:id/session`, authMiddleware, testSessionC.updateTestSession);
app.post(`${API_PREFIX}/tests/:id/session/submit`, authMiddleware, testSessionC.submitTestSession);

app.get(`${API_PREFIX}/user/:id`, userC.getUserById);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
});
