import { useState, useEffect } from "react";
import './test-main.sass';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";



function TestMain() {
    const { id } = useParams();
    const [testItemData, setTestItemData] = useState();
    const [questions, setQuestions] = useState([]);
    const userId = decodeToken(Cookies.get('token'))?._id;

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/tests/${id}`);
                setTestItemData(response.data);
                setQuestions(response.data?.questions || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTest();
    }, [id]);



    const [userAnswer, setUserAnswer] = useState(Array.from({ length: questions.length }, () => [0]));
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
    //     const currentAnswer = userAnswer[questionIndex];
    //     const newAnswer = currentAnswer.includes(answerIndex)
    //         ? currentAnswer.filter((index) => index !== answerIndex)
    //         : [...currentAnswer, answerIndex];
    //     setUserAnswer((prevAnswer) => [
    //         ...prevAnswer.slice(0, questionIndex),
    //         newAnswer,
    //         ...prevAnswer.slice(questionIndex + 1),
    //     ]);
    // };
    //radio works
    // const handleAnswerChange = (questionIndex, answerIndex) => {
    //     const newAnswer = [...userAnswer];
    //     newAnswer[questionIndex] = [answerIndex];
    //     setUserAnswer(newAnswer);
    // };
    const handleAnswerChange = (questionIndex, answerIndex, questionType) => {
        if (questionType === "checkbox") {
            const currentAnswer = userAnswer[questionIndex];
            if (currentAnswer === undefined) {
                // Если currentAnswer равно undefined, создайте новый массив с answerIndex
                const newAnswer = [answerIndex];
                setUserAnswer((prevAnswer) => {
                    const updatedAnswer = [...prevAnswer];
                    updatedAnswer[questionIndex] = newAnswer;
                    return updatedAnswer;
                });
            } else {
                const newAnswer = currentAnswer.includes(answerIndex)
                    ? currentAnswer.filter((index) => index !== answerIndex)
                    : [...currentAnswer, answerIndex];
                setUserAnswer((prevAnswer) => {
                    const updatedAnswer = [...prevAnswer];
                    updatedAnswer[questionIndex] = newAnswer;
                    return updatedAnswer;
                });
            }
        } else if (questionType === "radio") {
            const newAnswer = [...userAnswer];
            newAnswer[questionIndex] = [answerIndex];
            setUserAnswer(newAnswer);
        }
    };



    const handleStart = () => {
        setIsStarted(true);
    };

    const handleSubmit = async () => {
        setIsStarted(false);
        const newScore = questions.reduce((acc, question, index) => {
            const userSelectedAnswer = userAnswer[index];
            const correctAnswer = question.answer;
            let scoreIncrement = 0;

            // Check if all correct answer were selected for this question
            const isAllCorrectSelected = correctAnswer.every((answer) => userSelectedAnswer?.includes(answer));

            // Calculate the score increment based on the question type
            if (question.answer.length === 1) {
                // Single correct answer question
                scoreIncrement = isAllCorrectSelected ? 1 : 0;
            } else {
                // Multiple correct answer question
                const correctCount = correctAnswer?.filter((answer) => userSelectedAnswer?.includes(answer)).length;
                let wrongCount = userSelectedAnswer.length - correctAnswer.length;
                if (wrongCount < 0) {
                    wrongCount = 0;
                }
                let wrongScore = 0;
                if (correctAnswer.length === 2) {
                    wrongScore = 0.5;
                }
                else {
                    if (correctAnswer.length === 3) {
                        wrongScore = 1;
                    }
                    else {
                        wrongScore = 0;
                    }
                }
                console.log(wrongScore, wrongCount, correctAnswer.length, userSelectedAnswer.length)
                const scorePerAnswer = 1 / correctAnswer.length; // Calculate the score per correct answer

                scoreIncrement = correctCount * scorePerAnswer - (wrongCount * wrongScore);
            }

            return acc + scoreIncrement;
        }, 0);

        await setScore(newScore);
        setIsFinished(true);
        axios.post(`http://localhost:3002/user/complete/${userId}`, {
            test: id,
            result: newScore,
            time: formattedTime,
            date: new Date()
        })
            .then(response => {
                console.log('Post request successful:', response.data);
            })
            .catch(error => {
                console.error('Error during post request:', error);
            });
        // Устанавливаем isFinished в true, когда результаты отображаются
    };
    if (!testItemData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="test_main_wrapper">
            <div className="test_main_title">{testItemData.title}</div>
            <div className="test_main_descr">{testItemData.description}</div>
            <div className="test_main_quest">Кількість питань: {testItemData?.questions.length}</div>
            <div className="test_main_img">
                <img src={testItemData.img} alt={`Photo ${testItemData.img}`} />
            </div>
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
                                                <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
                                                    {question.options?.map((option, optionIndex) => (
                                                        <li key={optionIndex} style={{display: 'flex', justifyContent: 'start', gap: '0.3vw'}}>
                                                            <input
                                                                type={question.answer.length > 1 ? 'checkbox' : 'radio'}
                                                                name={`question-${index}`}
                                                                value={optionIndex}
                                                                checked={userAnswer[index]?.includes(optionIndex)}
                                                                onChange={() => handleAnswerChange(index, optionIndex, question.answer.length > 1 ? 'checkbox' : 'radio')}
                                                            />
                                                            <label style={{paddingBottom: '2px'}}>{option}</label>
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
