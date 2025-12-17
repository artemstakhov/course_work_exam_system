import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { config } from "../config/config.js";
import { AppError } from "../middleware/error.middleware.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name, teacher } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email вже використовується", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      teacher: teacher || false,
      email,
      password: passwordHash,
    });

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        teacher: user.teacher,
        name: user.name
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "Реєстрація успішна",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          teacher: user.teacher,
        },
        token,
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("Перевірте чи коректно введені дані", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError("Перевірте чи коректно введені дані", 400);
    }

    const token = jwt.sign(
      {
        _id: user._id,
        teacher: user.teacher,
        name: user.name
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(200)
      .json({
        success: true,
        message: "Вхід успішний",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          teacher: user.teacher,
        },
        token,
      });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ 
        success: true,
        message: "Вихід успішний" 
      });
  } catch (err) {
    next(err);
  }
};