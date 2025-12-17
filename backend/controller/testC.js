import Test from "../model/test.js";
import User from "../model/user.js";
import { AppError } from "../middleware/error.middleware.js";

export const createTest = async (req, res, next) => {
  try {
    const creator = req.params.id;
    const { title, img, questions, description, privateKey } = req.body;

    const user = await User.findById(creator);
    if (!user) {
      throw new AppError("Користувача не знайдено", 404);
    }

    if (privateKey && privateKey.trim() !== "") {
      const existingTest = await Test.findOne({ privateKey });
      if (existingTest) {
        throw new AppError("Приватний ключ вже використовується", 400);
      }
    }

    const test = new Test({ 
      title, 
      img, 
      creator, 
      description, 
      questions, 
      privateKey: privateKey || null 
    });
    
    await test.save();

    await User.findByIdAndUpdate(creator, {
      $push: { created_tests: test._id },
    });

    res.status(201).json({
      success: true,
      message: "Тест успішно створено",
      test,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneTest = async (req, res, next) => {
  try {
    const testId = req.params.id;
    
    const test = await Test.findById(testId)
      .populate("creator", "name email")
      .exec();
      
    if (!test) {
      throw new AppError("Тест не знайдено", 404);
    }
    
    // Remove answers from questions for security
    const testWithoutAnswers = {
      ...test.toObject(),
      questions: test.questions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options
        // answer field is intentionally omitted
      }))
    };
    
    res.status(200).json({
      success: true,
      test: testWithoutAnswers,
    });
  } catch (err) {
    next(err);
  }
};

export const getTests = async (req, res, next) => {
  try {
    const tests = await Test.find()
      .populate("creator", "name email")
      .sort({ createdAt: -1 })
      .exec();
      
    res.status(200).json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTest = async (req, res, next) => {
  try {
    const testId = req.params.id;

    const test = await Test.findById(testId);
    if (!test) {
      throw new AppError("Тест не знайдено", 404);
    }

    const creatorId = test.creator;

    await User.updateMany(
      {}, 
      { $pull: { passed_tests: { test: testId } } }
    );

    await User.updateOne(
      { _id: creatorId }, 
      { $pull: { created_tests: testId } }
    );

    await Test.findByIdAndDelete(testId);

    res.status(200).json({ 
      success: true,
      message: 'Тест успішно видалено' 
    });
  } catch (err) {
    next(err);
  }
};

export const completedTest = async (req, res, next) => {
  try {
    const result = req.body;
    const userId = req.params.user_id;

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("Користувача не знайдено", 404);
    }

    const test = await Test.findByIdAndUpdate(
      result.test,
      { $inc: { participants: 1 } },
      { new: true }
    )
      .populate("creator", "name email")
      .exec();

    if (!test) {
      throw new AppError("Тест не знайдено", 404);
    }

    result.date = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      {
        $push: { passed_tests: result },
      },
      { new: true }
    ).populate("passed_tests.test");

    res.status(200).json({
      success: true,
      message: "Результат збережено",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
