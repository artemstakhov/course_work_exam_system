import mongoose from "mongoose";

const Test = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participants: {
      type: Number,
      default: 0,
    },
    description:{
      type: String,
    },
    questions: [
      {
        text: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        answer: [
          {
            type: Number,
            required: true,
          },
        ],
      },
    ],
    privateKey: {
      type: String,
    },
  },
  { timestamps: true }
);


export default mongoose.model("test", Test);
