import TestSession from "../model/testSession.js";
import Test from "../model/test.js";
import User from "../model/user.js";
import { AppError } from "../middleware/error.middleware.js";

// Start a new test session
export const startTestSession = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const userId = req.user._id; // Из JWT токена

    // Check if test exists
    const test = await Test.findById(testId);
    if (!test) {
      throw new AppError("Тест не знайдено", 404);
    }

    // Check if user already passed this test
    const user = await User.findById(userId);
    if (user.passed_tests && user.passed_tests.some(pt => pt.test.toString() === testId)) {
      throw new AppError("Ви вже проходили цей тест", 403);
    }

    // Check for existing in-progress session
    let session = await TestSession.findOne({
      user: userId,
      test: testId,
      status: 'in-progress'
    });

    // If session exists, return it
    if (session) {
      return res.status(200).json({
        success: true,
        session,
        message: "Продовження існуючої сесії"
      });
    }

    // Create new session
    session = new TestSession({
      user: userId,
      test: testId,
      startTime: new Date(),
      answers: test.questions.map(q => ({
        questionId: q._id,
        selectedOptions: []
      }))
    });

    await session.save();

    res.status(201).json({
      success: true,
      session,
      message: "Сесію розпочато"
    });
  } catch (err) {
    next(err);
  }
};

// Get current session
export const getTestSession = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const userId = req.user._id; // Из JWT токена

    const session = await TestSession.findOne({
      user: userId,
      test: testId,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Активна сесія не знайдена"
      });
    }

    res.status(200).json({
      success: true,
      session
    });
  } catch (err) {
    next(err);
  }
};

// Update session answers (auto-save)
export const updateTestSession = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const userId = req.user._id; // Из JWT токена
    const { answers } = req.body;

    const session = await TestSession.findOne({
      user: userId,
      test: testId,
      status: 'in-progress'
    });

    if (!session) {
      throw new AppError("Активна сесія не знайдена", 404);
    }

    // Update answers
    session.answers = answers;
    await session.save();

    res.status(200).json({
      success: true,
      message: "Відповіді збережено"
    });
  } catch (err) {
    next(err);
  }
};

// Submit test and calculate score
export const submitTestSession = async (req, res, next) => {
  try {
    const testId = req.params.id;
    const userId = req.user._id; // Из JWT токена
    const { answers } = req.body;

    const session = await TestSession.findOne({
      user: userId,
      test: testId,
      status: 'in-progress'
    });

    if (!session) {
      throw new AppError("Активна сесія не знайдена", 404);
    }

    // Get test with correct answers
    const test = await Test.findById(testId);
    if (!test) {
      throw new AppError("Тест не знайдено", 404);
    }

    // Calculate score
    let score = 0;
    test.questions.forEach((question, index) => {
      const userAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
      if (!userAnswer) return;

      const userSelectedOptions = userAnswer.selectedOptions || [];
      const correctAnswer = question.answer;

      const isAllCorrectSelected = correctAnswer.every(answer => 
        userSelectedOptions.includes(answer)
      );

      if (correctAnswer.length === 1) {
        // Single correct answer
        score += isAllCorrectSelected && userSelectedOptions.length === 1 ? 1 : 0;
      } else {
        // Multiple correct answers
        const correctCount = correctAnswer.filter(answer => 
          userSelectedOptions.includes(answer)
        ).length;
        
        const wrongCount = Math.max(0, userSelectedOptions.length - correctAnswer.length);
        
        let wrongScore = 0;
        if (correctAnswer.length === 2) {
          wrongScore = 0.5;
        } else if (correctAnswer.length === 3) {
          wrongScore = 1;
        }
        
        const scorePerAnswer = 1 / correctAnswer.length;
        const questionScore = correctCount * scorePerAnswer - (wrongCount * wrongScore);
        score += Math.max(0, questionScore);
      }
    });

    // Calculate time spent
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - session.startTime) / 1000);

    // Update session
    session.status = 'completed';
    session.endTime = endTime;
    session.score = score;
    session.timeSpent = timeSpent;
    session.answers = answers;
    await session.save();

    // Update test participants
    await Test.findByIdAndUpdate(testId, {
      $inc: { participants: 1 }
    });

    // Update user's passed tests
    await User.findByIdAndUpdate(userId, {
      $push: {
        passed_tests: {
          test: testId,
          result: score,
          time: new Date(timeSpent * 1000).toISOString().substr(11, 8),
          date: endTime
        }
      }
    });

    res.status(200).json({
      success: true,
      score,
      timeSpent,
      message: "Тест завершено"
    });
  } catch (err) {
    next(err);
  }
};
