export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Ім\'я повинно містити мінімум 2 символи');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Некоректний email');
  }

  if (!password || password.length < 6) {
    errors.push('Пароль повинен містити мінімум 6 символів');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Помилка валідації', errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Некоректний email');
  }

  if (!password) {
    errors.push('Пароль обов\'язковий');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Помилка валідації', errors });
  }

  next();
};

export const validateTest = (req, res, next) => {
  const { title, questions } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('Назва тесту повинна містити мінімум 3 символи');
  }

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    errors.push('Тест повинен містити хоча б одне питання');
  }

  if (questions) {
    questions.forEach((q, index) => {
      if (!q.text || q.text.trim().length < 3) {
        errors.push(`Питання ${index + 1}: текст повинен містити мінімум 3 символи`);
      }
      if (!q.options || q.options.length < 2) {
        errors.push(`Питання ${index + 1}: повинно бути мінімум 2 варіанти відповіді`);
      }
      if (!q.answer || q.answer.length === 0) {
        errors.push(`Питання ${index + 1}: повинна бути вказана правильна відповідь`);
      }
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Помилка валідації', errors });
  }

  next();
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
