import express from "express";
import mongoose from "mongoose";
import * as registerC from "./controller/registerC.js";
import * as testC from "./controller/testC.js";
import * as userC from './controller/userC.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
const quizServer = express();
await mongoose
  .connect(
    "mongodb+srv://stakhovartem:123artem@cluster0.gqfhulw.mongodb.net/  "
  )
  .then(() => console.log("DB coneccted"))
  .catch((err) => console.log("DB error", err));

quizServer.use(express.json());
const PORT = 3002;
quizServer.use(cookieParser());
quizServer.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3000/create/',
      'http://localhost:3000/login',
      'http://localhost:3000/test',
      'http://localhost:3000/profile'
    ],
  })
);

quizServer.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

quizServer.post("/auth/login", registerC.login);
quizServer.post("/auth/register", registerC.register);
quizServer.post("/auth/logout", registerC.logout);
quizServer.post("/user/test/:id", testC.createTest);
quizServer.post("/user/complete/:user_id", testC.completedTest);
quizServer.get("/tests/:id", testC.getOneTest);
quizServer.get("/tests", testC.getTests);
quizServer.delete("/tests/:id", testC.deleteTest);
quizServer.get("/user/:id", userC.getUserById);
