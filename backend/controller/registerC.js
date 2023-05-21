import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const register = async (reg, res) => {
  try {
    const email = reg.body.email;
    const InUse = await User.findOne({ email });
    if (InUse) return res.status(400).json({ message: "Email olready exist" });
    const password = reg.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      name: reg.body.name,
      teacher:reg.body.teacher,
      email,
      password:passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
        teacher: user.teacher
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося зареєструватися",
    });
  }

};

export const login = async (reg, res) => {
  try {
    const user = await User.findOne({ email: reg.body.email });
    if (!user) return res.status(400).json({ message: "Перевірте чи коректно введені данні" });
    const isPasswordCorrect = await bcrypt.compare(reg.body.password, user.password);
    if (!isPasswordCorrect) res.status(400).json({ message: "Перевірте чи коректно введені данні" })

    const token = jwt.sign(
      {
        _id: user._id,
        teacher: user.teacher
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

   res
      .cookie("token", token, {
        httpOnly: false,
      })
      .status(200)
      .json({
        message: "OK",
      });

  }
  catch (err) {
    res.status(500).json({
      message: "Не вдалося увійти",
    });
    console.log(err);
  }
};
export const logout = (req, res) => {
  
  const token = req.headers.authorization || req.query.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Токен отсутствует" });
  }

  try {
   
    const decodedToken = jwt.verify(token, "secret123");

    res.json({ message: "Логаут успешный" });
  } catch (err) {
    res.status(401).json({ message: "Недействительный токен" });
  }
};