import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  teacher: {
    type: Boolean,
    default: false,
  },
  passed_tests: [
    {
      test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test",
        required: true,
      },
      result: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true
      }
    },
  ],
  created_tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test",
    },
  ],
});

UserSchema.pre("findOne", function () {
  this.populate("passed_tests.test");
  this.populate("created_tests");
});

const User = mongoose.model("user", UserSchema);

export default User;
