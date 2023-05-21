import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import './create-page.sass';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Header from '../../components/header/header';
import { Button } from '@mui/material';

function CreatePage() {
  const id = decodeToken(Cookies.get('token'))._id;
  const [responseError, setResponseError] = useState('');
  const [newTest, setNewTest] = useState({
    title: '',
    img: '',
    description: '',
    privateKey: "",
    questions: [
      {
        text: '',
        options: [''],
        answer: []
      }
    ]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTest((prevTest) => ({
      ...prevTest,
      [name]: value
    }));
  };

  const handleQuestionChange = (event, index) => {
    const { name, value } = event.target;
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      questions[index] = {
        ...questions[index],
        [name]: value
      };
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const { value } = event.target;
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      const options = [...questions[questionIndex].options];
      options[optionIndex] = value;
      questions[questionIndex] = {
        ...questions[questionIndex],
        options
      };
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleAnswerChange = (event, questionIndex, optionIndex) => {
    const { checked } = event.target;
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      const answer = [...questions[questionIndex].answer];
      if (checked) {
        answer.push(optionIndex);
      } else {
        const index = answer.indexOf(optionIndex);
        if (index > -1) {
          answer.splice(index, 1);
        }
      }
      questions[questionIndex] = {
        ...questions[questionIndex],
        answer
      };
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleAddQuestion = () => {
    setNewTest((prevTest) => ({
      ...prevTest,
      questions: [
        ...prevTest.questions,
        {
          text: '',
          options: [''],
          answer: []
        }
      ]
    }));
  };

  const handleRemoveQuestion = (index) => {
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      questions.splice(index, 1);
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleAddOption = (questionIndex) => {
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      const options = [...questions[questionIndex].options];
      if (options.length < 6) {
        options.push('');
      }
      questions[questionIndex] = {
        ...questions[questionIndex],
        options
      };
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    setNewTest((prevTest) => {
      const questions = [...prevTest.questions];
      const options = [...questions[questionIndex].options];
      options.splice(optionIndex, 1);
      questions[questionIndex] = {
        ...questions[questionIndex],
        options
      };
      return {
        ...prevTest,
        questions
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:3002/user/test/${id}`;
    console.log(newTest);
    axios
      .post(url, newTest)
      .then((response) => {
        console.log('Response:', response.data);
        // Сброс формы
        setNewTest({
          title: '',
          img: '',
          description: '',
          privateKey: '',
          questions: [
            {
              text: '',
              options: [],
              answer: []
            }
          ]
        });
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
        setResponseError(error.response.data);
      });
  };
  
  const { title, img, description, privateKey, questions } = newTest;

  return (
    <>
    <Header />
    <div className='create__wrapper'>
      <form onSubmit={handleSubmit}>
      <div className="create_text">
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Image URL"
          name="img"
          value={img}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Private Key"
          name="privateKey"
          value={privateKey}
          onChange={handleChange}
        />
        </div>
        {questions.map((question, questionIndex) => (
          <div className='questions' key={questionIndex}>
            <TextField
              id={`question-${questionIndex}`}
              label={`Question ${questionIndex + 1}`}
              name="text"
              value={question.text}
              onChange={(event) => handleQuestionChange(event, questionIndex)}
            />
            {question.options.map((option, optionIndex) => (
              <div className='options' key={optionIndex}>
                <TextField
                  id={`option-${questionIndex}-${optionIndex}`}
                  label={`Option ${optionIndex + 1}`}
                  name="option"
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(event, questionIndex, optionIndex)
                  }
                />
                <Checkbox
                  checked={question.answer.includes(optionIndex)}
                  onChange={(event) =>
                    handleAnswerChange(event, questionIndex, optionIndex)
                  }
                />
                {optionIndex > 0 && (
                  <IconButton
                    onClick={() =>
                      handleRemoveOption(questionIndex, optionIndex)
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                )}
              </div>
            ))}
            {question.options.length < 6 && (
              <IconButton onClick={() => handleAddOption(questionIndex)}>
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            )}
            <Button style={{color:'#fff',fontSize: '16px',backgroundColor: '#729fdf'}} onClick={() => handleRemoveQuestion(questionIndex)}>
              Remove Question
            </Button>
          </div>
        ))}
        <div className="btn__wrapper">
        <Button style={{color:'#fff',fontSize: '16px', backgroundColor: '#729fdf'}} onClick={handleAddQuestion}>
          Add question
        </Button>
        <Button style={{color:'#fff',fontSize: '16px',backgroundColor: '#729fdf'}} className='submit_btn' type="submit">Create test</Button>
        </div>
      </form>
    </div>
    </>
  );
}

export default CreatePage;
