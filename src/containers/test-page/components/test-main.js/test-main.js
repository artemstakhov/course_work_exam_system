import { useState, useEffect } from "react";
import './test-main.sass';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";



function TestMain(props) {
    const [questions, setQuestions] = useState([
        {
            text: 'What is the capital of France?',
            options: ['Paris', 'Berlin', 'London', 'Madrid'],
            answers: [0],
        },
        {
            text: 'What is the highest mountain in the world?',
            options: ['Mount Everest', 'K2', 'Makalu', 'Cho Oyu'],
            answers: [0],
        },
        {
            text: 'What is the best country in the world?',
            options: ['Russia', 'Canada', 'China', 'USA'],
            answers: [0, 1],
        },
    ]);

    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill([]));
    const [score, setScore] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timer, setTimer] = useState(0);
    const formattedTime = new Date(timer * 1000).toISOString().substr(11, 8);

    useEffect(() => {
        let intervalId = null;
        if (isStarted) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isStarted]);
    //checkbox works
    // const handleAnswerChange = (questionIndex, answerIndex) => {
    //     const currentAnswers = userAnswers[questionIndex];
    //     const newAnswers = currentAnswers.includes(answerIndex)
    //         ? currentAnswers.filter((index) => index !== answerIndex)
    //         : [...currentAnswers, answerIndex];
    //     setUserAnswers((prevAnswers) => [
    //         ...prevAnswers.slice(0, questionIndex),
    //         newAnswers,
    //         ...prevAnswers.slice(questionIndex + 1),
    //     ]);
    // };
    //radio works
    // const handleAnswerChange = (questionIndex, answerIndex) => {
    //     const newAnswers = [...userAnswers];
    //     newAnswers[questionIndex] = [answerIndex];
    //     setUserAnswers(newAnswers);
    // };
    const handleAnswerChange = (questionIndex, answerIndex, questionType) => {
        if (questionType === "checkbox") {
            const currentAnswers = userAnswers[questionIndex];
            const newAnswers = currentAnswers.includes(answerIndex)
                ? currentAnswers.filter((index) => index !== answerIndex)
                : [...currentAnswers, answerIndex];
            setUserAnswers((prevAnswers) => [
                ...prevAnswers.slice(0, questionIndex),
                newAnswers,
                ...prevAnswers.slice(questionIndex + 1),
            ]);
        } else if (questionType === "radio") {
            const newAnswers = [...userAnswers];
            newAnswers[questionIndex] = [answerIndex];
            setUserAnswers(newAnswers);
        }
    };

    const handleStart = () => {
        setIsStarted(true);
    };

    const handleSubmit = () => {
        setIsStarted(false);
        const newScore = questions.reduce((acc, question, index) => {
            const userSelectedAnswers = userAnswers[index];
            const correctAnswers = question.answers;
            let scoreIncrement = 0;

            // Check if all correct answers were selected for this question
            const isAllCorrectSelected = correctAnswers.every((answer) => userSelectedAnswers.includes(answer));

            // Calculate the score increment based on the question type
            if (question.answers.length === 1) {
                // Single correct answer question
                scoreIncrement = isAllCorrectSelected ? 1 : 0;
            } else {
                // Multiple correct answers question
                const correctCount = correctAnswers.filter((answer) => userSelectedAnswers.includes(answer)).length;
                let wrongCount = userSelectedAnswers.length - correctAnswers.length;
                if (wrongCount < 0) {
                    wrongCount = 0;
                }
                let wrongScore = 0;
                if (correctAnswers.length === 2) {
                    wrongScore = 0.5;
                }
                else {
                    if (correctAnswers.length === 3) {
                        wrongScore = 1;
                    }
                    else {
                        wrongScore = 0;
                    }
                }
                console.log(wrongScore, wrongCount, correctAnswers.length, userSelectedAnswers.length)
                const scorePerAnswer = 1 / correctAnswers.length; // Calculate the score per correct answer

                scoreIncrement = correctCount * scorePerAnswer - (wrongCount * wrongScore);
            }

            return acc + scoreIncrement;
        }, 0);

        setScore(newScore);
        setIsFinished(true); // Устанавливаем isFinished в true, когда результаты отображаются
    };

    return (
        <div className="test_main_wrapper">
            <div className="test_main_title">{props.title}</div>
            {/* Проверяем, если isFinished равно true, то показываем только результат */}
            {isFinished ? (
                <>
                    <div className="test__center test__results">
                        <p>Your score is {score}</p>
                        <p>Timer: {formattedTime}</p>
                        <Link style={{ all: 'unset' }} to='/'>
                            <button className="test-btn">
                                Go back
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    {/* Показываем только когда isStarted и isFinished равны false */}
                    {!isStarted && (
                        <div className="test__center">
                            <button className="test__start__btn test-btn" onClick={handleStart}>
                                Start
                            </button>
                        </div>
                    )}
                    {/* Показываем только когда isStarted равно true */}
                    {isStarted && (
                        <>
                            <p className="test__timer">Timer: {formattedTime}</p>
                            <div className="test__center">

                                <Carousel interval={null} variant="dark" className="test__list">
                                    {questions.map((question, index) => (
                                        <Carousel.Item key={index} >
                                        <div className="test__quest">
                                            <h2>{question.text}</h2>
                                            <ul>
                                                {question.options.map((option, optionIndex) => (
                                                    <li key={optionIndex}>
                                                        <input
                                                            type={question.answers.length > 1 ? 'checkbox' : 'radio'}
                                                            name={`question-${index}`}
                                                            value={optionIndex}
                                                            checked={userAnswers[index].includes(optionIndex)}
                                                            onChange={() => handleAnswerChange(index, optionIndex, question.answers.length > 1 ? 'checkbox' : 'radio')}
                                                        />
                                                        <label>{option}</label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </Carousel.Item>
                                    ))}
                                    <Carousel.Item>
                                        <div className="test-submit__wrapper">
                                            <button className="test-submit__btn test-btn" onClick={handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>


                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
export default TestMain;
