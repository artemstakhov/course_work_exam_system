import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { fetchTestById } from '../../../../store/slices/testsSlice';
import { startSession, getSession, updateSession, submitSession, updateLocalAnswers } from '../../../../store/slices/sessionsSlice';
import { getUserById } from '../../../../store/slices/authSlice';
import './test-main.scss';

function TestMain() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux state
    const { currentTest: testItemData, loading, error } = useSelector(state => state.tests);
    const { currentSession: session, submitting, result } = useSelector(state => state.sessions);
    const { user } = useSelector(state => state.auth);
    
    // Local state
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timer, setTimer] = useState(0);
    const [userAnswer, setUserAnswer] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [alreadyPassed, setAlreadyPassed] = useState(false);
    
    const userId = decodeToken(Cookies.get('token'))?._id;
    const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);
    const questions = testItemData?.questions || [];

    // Fetch test data and user info
    useEffect(() => {
        dispatch(fetchTestById(id));
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [dispatch, id, userId]);

    // Check if test already passed
    useEffect(() => {
        if (user && user.passed_tests && id) {
            const hasPassed = user.passed_tests.some(pt => pt.test?._id === id);
            setAlreadyPassed(hasPassed);
        }
    }, [user, id]);

    // Check for existing session
    useEffect(() => {
        if (!userId || !id || questions.length === 0) return;
        
        dispatch(getSession(id))
            .unwrap()
            .then((data) => {
                if (data.session) {
                    setIsStarted(true);
                    const restoredAnswers = data.session.answers.map(a => a.selectedOptions);
                    setUserAnswer(restoredAnswers);
                }
            })
            .catch(() => {
                // No session found, that's ok
            });
    }, [dispatch, userId, id, questions.length]);

    // Calculate timer based on session start time
    useEffect(() => {
        let intervalId = null;
        if (isStarted && session) {
            const updateTimer = () => {
                const elapsed = Math.floor((new Date() - new Date(session.startTime)) / 1000);
                setTimer(elapsed);
            };
            
            updateTimer();
            intervalId = setInterval(updateTimer, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isStarted, session]);

    // Auto-save answers when they change
    const saveAnswers = useCallback((answers) => {
        if (!session || !userId) return;
        
        const formattedAnswers = questions.map((q, index) => ({
            questionId: q._id,
            selectedOptions: answers[index] || []
        }));
        
        dispatch(updateSession({ 
            testId: id, 
            answers: formattedAnswers 
        }));
    }, [session, userId, id, questions, dispatch]);

    // Debounced auto-save
    useEffect(() => {
        if (!isStarted || !session) return;
        
        const timeoutId = setTimeout(() => {
            saveAnswers(userAnswer);
        }, 1000);
        
        return () => clearTimeout(timeoutId);
    }, [userAnswer, isStarted, session, saveAnswers]);

    const handleAnswerChange = (questionIndex, answerIndex, questionType) => {
        console.log('Answer change:', { questionIndex, answerIndex, questionType, currentAnswer: userAnswer[questionIndex] });
        
        if (questionType === "checkbox") {
            const currentAnswer = userAnswer[questionIndex] || [];
            const newAnswer = currentAnswer.includes(answerIndex)
                ? currentAnswer.filter((index) => index !== answerIndex)
                : [...currentAnswer, answerIndex];
            
            setUserAnswer((prevAnswer) => {
                const updatedAnswer = [...prevAnswer];
                updatedAnswer[questionIndex] = newAnswer;
                console.log('Updated answer:', updatedAnswer);
                return updatedAnswer;
            });
        } else if (questionType === "radio") {
            setUserAnswer((prevAnswer) => {
                const updatedAnswer = [...prevAnswer];
                updatedAnswer[questionIndex] = [answerIndex];
                console.log('Updated answer (radio):', updatedAnswer);
                return updatedAnswer;
            });
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const goToPrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleStart = async () => {
        if (!userId) {
            return;
        }
        
        if (alreadyPassed) {
            alert('Ви вже проходили цей тест! Повторне проходження неможливе.');
            return;
        }
        
        try {
            const data = await dispatch(startSession(id)).unwrap();
            setIsStarted(true);
            
            // Initialize answers from session or create empty array
            if (data.session.answers && data.session.answers.length > 0) {
                const restoredAnswers = data.session.answers.map(a => a.selectedOptions || []);
                setUserAnswer(restoredAnswers);
            } else {
                setUserAnswer(Array.from({ length: questions.length }, () => []));
            }
        } catch (error) {
            console.error('Failed to start session:', error);
            if (error.message && error.message.includes('вже проходили')) {
                alert('Ви вже проходили цей тест! Повторне проходження неможливе.');
                setAlreadyPassed(true);
            }
        }
    };

    const handleSubmit = async () => {
        if (!userId || !session) return;
        
        try {
            const formattedAnswers = questions.map((q, index) => ({
                questionId: q._id,
                selectedOptions: userAnswer[index] || []
            }));
            
            await dispatch(submitSession({ 
                testId: id, 
                answers: formattedAnswers 
            })).unwrap();
            
            setIsFinished(true);
            setIsStarted(false);
        } catch (error) {
            console.error('Failed to submit test:', error);
        }
    };
    
    if (loading) {
        return (
            <div className="test_main_wrapper">
                <div className="test-loading">
                    <div className="loading-spinner"></div>
                    <p>Завантаження тесту...</p>
                </div>
            </div>
        );
    }
    
    if (error || !testItemData || !testItemData.questions || testItemData.questions.length === 0) {
        return (
            <div className="test_main_wrapper">
                <div className="test-error">
                    <div className="error-icon">⚠️</div>
                    <h2>Помилка завантаження</h2>
                    <p>{error || 'Тест не знайдено або не містить питань'}</p>
                    <Link to='/'>
                        <button className="test-btn">Повернутися на головну</button>
                    </Link>
                </div>
            </div>
        );
    }
    
    if (!userId) {
        return (
            <div className="test_main_wrapper">
                <div className="test-error">
                    <div className="error-icon">🔒</div>
                    <h2>Потрібна авторизація</h2>
                    <p>Для проходження тесту необхідно увійти в систему</p>
                    <Link to='/'>
                        <button className="test-btn">Повернутися на головну</button>
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="test_main_wrapper">
            <div className="test-header-section">
                <div className="test-info">
                    <div className="test_main_title">{testItemData.title}</div>
                    <div className="test_main_descr">{testItemData.description}</div>
                    <div className="test_main_quest">Кількість питань: {testItemData.questions.length}</div>
                </div>
                {testItemData.img && (
                    <div className="test_main_img">
                        <img src={testItemData.img} alt={testItemData.title} />
                    </div>
                )}
            </div>
            
            {alreadyPassed && !isStarted && (
                <div className="test__center">
                    <div className="test__alert test__alert--warning">
                        <div className="alert-icon">⚠️</div>
                        <h3>Тест вже пройдено</h3>
                        <p>Ви вже проходили цей тест раніше. Повторне проходження неможливе.</p>
                        <Link to="/profile" className="test-btn">Переглянути результати</Link>
                    </div>
                </div>
            )}
            
            {isFinished ? (
                <>
                    <div className="test__center test__results">
                        <div className="result-card">
                            <div className="result-icon">🎉</div>
                            <h2>Тест завершено!</h2>
                            <div className="result-score">
                                <span className="score-label">Ваш результат:</span>
                                <span className="score-value">{result?.score?.toFixed(2)}</span>
                            </div>
                            <div className="result-time">
                                <span className="time-icon">⏱️</span>
                                <span>Час: {new Date(result?.timeSpent * 1000).toISOString().substr(11, 8)}</span>
                            </div>
                            <Link to='/'>
                                <button className="test-btn">Повернутися на головну</button>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {!isStarted && (
                        <div className="test__center">
                            <button 
                                className="test__start__btn test-btn" 
                                onClick={handleStart}
                                disabled={alreadyPassed}
                                style={{
                                    opacity: alreadyPassed ? 0.5 : 1,
                                    cursor: alreadyPassed ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {session ? 'Продовжити тест' : 'Почати тест'}
                            </button>
                        </div>
                    )}
                    {isStarted && (
                        <>
                            <div className="test__timer">
                                <span className="timer-icon">⏱️</span>
                                <span>Час: {formattedTime}</span>
                                <span className="auto-save-indicator">💾 Автозбереження</span>
                            </div>
                            <div className="test__center">
                                {currentQuestion < questions.length ? (
                                    <>
                                        <div className="test__quest">
                                            <div className="question-header">
                                                <span className="question-number">{currentQuestion + 1}/{questions.length}</span>
                                            </div>
                                            <h2 className="question-text">{questions[currentQuestion].text}</h2>
                                            <ul className="options-list">
                                                {questions[currentQuestion].options?.map((option, optionIndex) => {
                                                    const isChecked = Array.isArray(userAnswer[currentQuestion]) && userAnswer[currentQuestion].includes(optionIndex);
                                                    const inputType = questions[currentQuestion].answer?.length > 1 ? 'checkbox' : 'radio';
                                                    
                                                    return (
                                                        <li 
                                                            key={optionIndex} 
                                                            className={`option-item ${isChecked ? 'option-checked' : ''}`}
                                                            onClick={() => handleAnswerChange(currentQuestion, optionIndex, inputType)}
                                                        >
                                                            <input
                                                                type={inputType}
                                                                name={`question-${currentQuestion}`}
                                                                value={optionIndex}
                                                                checked={isChecked}
                                                                onChange={() => handleAnswerChange(currentQuestion, optionIndex, inputType)}
                                                                readOnly
                                                            />
                                                            <label>
                                                                {option}
                                                            </label>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            
                                            <div className="question-navigation" style={{
                                                display: 'flex', 
                                                gap: '1rem', 
                                                justifyContent: 'space-between',
                                                marginTop: '2rem'
                                            }}>
                                                <button 
                                                    className="test-btn"
                                                    onClick={goToPrevQuestion}
                                                    disabled={currentQuestion === 0}
                                                    style={{
                                                        opacity: currentQuestion === 0 ? 0.5 : 1,
                                                        cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
                                                    }}
                                                >
                                                    ← Назад
                                                </button>
                                                <button 
                                                    className="test-btn"
                                                    onClick={goToNextQuestion}
                                                >
                                                    {currentQuestion === questions.length - 1 ? 'Завершити →' : 'Далі →'}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="test-submit__wrapper">
                                        <h3>Готові здати тест?</h3>
                                        <p>Перевірте всі відповіді перед відправкою</p>
                                        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                                            <button 
                                                className="test-btn" 
                                                onClick={goToPrevQuestion}
                                                style={{backgroundColor: '#6c757d'}}
                                            >
                                                ← Назад до питань
                                            </button>
                                            <button className="test-submit__btn test-btn" onClick={handleSubmit}>
                                                Завершити тест
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
export default TestMain;
