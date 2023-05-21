import Test from "../model/test.js";
import User from "../model/user.js";

export const createTest = async (req, res) => {
  try {
    const creator = req.params.id;
    const { title, img, questions, description, privateKey } = req.body;

    if (privateKey !== "") {
      // Проверка уникальности для непустого privateKey
      const existingTest = await Test.findOne({ privateKey });
      if (existingTest) {
        return res.status(400).json({ message: "Private key must be unique" });
      }
    }

    const test = new Test({ title, img, creator, description, questions, privateKey });
    await test.save();

    await User.findByIdAndUpdate(creator, {
      $push: { created_tests: test._id },
    });

    res.status(201).json(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не вдалося створити тест" });
  }
};



export const getOneTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.findById(
      testId,
    )
      .populate("creator")
      .exec();
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    return res.status(200).json(test);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("creator").exec();
    res.json(tests);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTest = async (req, res) => {
  const testId = req.params.id;

  try {
    const test = await Test.findById(testId);
    const creatorId = test.creator;

    await User.updateMany({}, { $pull: { passed_tests: { test: testId } } });

    await User.updateOne({ _id: creatorId }, { $pull: { created_tests: testId } });

    await Test.findByIdAndDelete(testId);

    res.status(200).json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete test' });
  }
};


export const completedTest = async (req, res) => {
  try {
    const result = req.body;
    const userId = req.params.user_id;
    const test = await Test.findByIdAndUpdate(
      result.test,
      { $inc: { participants: 1 } },
      { new: true }
    )
      .populate("creator")
      .exec();
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $push: { passed_tests: result },
      
    }).populate("passed_tests.test");
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
