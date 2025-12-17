# Архітектура Frontend

## Структура Redux

### API Service (`src/utils/api.js`)
Централізований сервіс для всіх HTTP запитів. Використовує axios instance з базовими налаштуваннями:
- `baseURL`: `process.env.REACT_APP_API_URL` (http://localhost:3002/api/v2)
- `withCredentials`: true для роботи з cookies
- Автоматична обробка 401 помилок (редірект на /login)

**Методи:**
- Auth: `register()`, `login()`, `logout()`
- Users: `getUserById(userId)`
- Tests: `getTests()`, `getTestById(testId)`, `createTest(userId, testData)`, `deleteTest(testId)`
- Sessions: `startSession(testId)`, `getSession(testId)`, `updateSession(testId, data)`, `submitSession(testId)`

### Redux Slices

#### 1. `authSlice` (`src/store/slices/authSlice.js`)
**State:**
- `user`: поточний користувач
- `token`: JWT токен з cookies
- `loading`: статус завантаження
- `error`: помилки

**Async Thunks:**
- `register(userData)` - реєстрація нового користувача
- `login(credentials)` - вхід користувача
- `logout()` - вихід користувача
- `getUserById(userId)` - отримання даних користувача

**Reducers:**
- `clearError()` - очищення помилок
- `setToken(token)` - встановлення токена

#### 2. `testsSlice` (`src/store/slices/testsSlice.js`)
**State:**
- `tests`: масив всіх тестів
- `currentTest`: поточний тест
- `loading`: статус завантаження
- `error`: помилки

**Async Thunks:**
- `fetchTests()` - отримання всіх тестів
- `fetchTestById(testId)` - отримання тесту по ID
- `createTest({ userId, testData })` - створення нового тесту
- `deleteTest(testId)` - видалення тесту

**Reducers:**
- `clearCurrentTest()` - очищення поточного тесту
- `clearError()` - очищення помилок

#### 3. `sessionsSlice` (`src/store/slices/sessionsSlice.js`)
**State:**
- `currentSession`: поточна сесія тесту
- `loading`: статус завантаження
- `error`: помилки
- `submitting`: статус відправки
- `result`: результат тесту

**Async Thunks:**
- `startSession(testId)` - початок тесту
- `getSession(testId)` - отримання сесії
- `updateSession({ testId, answers })` - оновлення відповідей (auto-save)
- `submitSession(testId)` - завершення тесту

**Reducers:**
- `clearSession()` - очищення сесії
- `clearError()` - очищення помилок
- `updateLocalAnswers(answers)` - локальне оновлення відповідей

## Використання в компонентах

### Приклад використання Redux:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests } from '../../store/slices/testsSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector(state => state.tests);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  // Компонент автоматично отримає дані з store
}
```

## Принципи

### DRY (Don't Repeat Yourself)
- Всі API виклики в одному місці (`apiService`)
- Переіспользуємий Redux state management
- Єдина точка конфігурації API URL

### SOLID
- **Single Responsibility**: 
  - `apiService` - тільки HTTP запити
  - Slices - тільки управління state
  - Components - тільки UI логіка
  
- **Open/Closed**: 
  - Легко додати нові endpoints в `apiService`
  - Легко додати нові thunks в slices

### KISS (Keep It Simple, Stupid)
- Прості, зрозумілі імена функцій
- Чітка структура папок
- Мінімум абстракцій

## Environment Variables

**Frontend** (`.env`):
```
REACT_APP_API_URL=http://localhost:3002/api/v2
```

**Backend** (`.env`):
```
API_VERSION=v2
PORT=3002
```

## Міграція компонентів

✅ Всі компоненти мігровані на Redux:
- `search-test.js` - використовує `fetchTests`, `getUserById`
- `done-test.js` - використовує `getUserById`
- `host-test.js` - використовує `getUserById`, `deleteTest`
- `create-page.js` - використовує `createTest`
- `login-page.js` - використовує `login`, `register`
- `test-main.js` - використовує всі session thunks

## Безпека

- Відповіді тестів ніколи не приходять на frontend
- Всі перевірки на backend
- JWT токени зберігаються в httpOnly cookies
- Автоматична валідація сесій
