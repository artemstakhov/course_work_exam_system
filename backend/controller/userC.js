import User from "../model/user.js";
import { AppError } from "../middleware/error.middleware.js";

export const getUserById = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.params.id)
      .populate("passed_tests.test")
      .populate("created_tests")
      .exec();

    if (!userInfo) {
      throw new AppError("Користувача не знайдено", 404);
    }

    res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (err) {
    next(err);
  }
};
