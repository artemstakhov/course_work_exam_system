import User from "../model/user.js";

export const getUserById = async (req, res) => {
  try {
    const userInfo = await User.findById(req.params.id)
      .populate("passed_tests.test")
      .populate("created_tests.test")
      .exec();

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
