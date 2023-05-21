import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Radio, RadioGroup, Switch, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login-page.sass';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isRegister) {
      // Send a POST request for registration
      axios
        .post('http://localhost:3002/auth/register', { name, email, password, teacher })
        .then(() => {
          setIsRegister(false);
        })
        .catch((error) => {
          if (error.response) {
            // Error with a server response
            setError(error.response.data.message);
          } else {
            // Other error
            setError('An error occurred');
          }
        });
    } else {
      // Send a POST request for login
      axios
        .post('http://localhost:3002/auth/login', { email, password })
        .then(() => {
          // Redirect to the main page
          navigate('/');
        })
        .catch((error) => {
          if (error.response) {
            // Error with a server response
            setError(error.response.data.message);
          } else {
            // Other error
            setError('An error occurred');
          }
        });
    }
  };

  return (
    <div className="reg-log__wrapper">
      <form className='reg-log__form' onSubmit={handleFormSubmit}>
        <FormControlLabel
          control={<Switch checked={isRegister} onChange={(e) => setIsRegister(e.target.checked)} />}
          label={isRegister ? 'Sign up' : 'Log in' }
        />
        {!isRegister ? (
          <>
            <InputLabel>Email</InputLabel>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.length===0}
              autoComplete="username"
            />
            <InputLabel>Password</InputLabel>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={password.length===0}
              autoComplete="current-password"
            />
          </>
        ) : (
          <>
            <InputLabel>Name</InputLabel>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={name.length===0}
              autoComplete="name"
            />
            <InputLabel>Email</InputLabel>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.length===0}
              autoComplete="username"
            />
            <InputLabel>Password</InputLabel>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={password.length===0}
              autoComplete="new-password"
            />
            <InputLabel>Role</InputLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              value={teacher ? 'teacher' : 'student'}
              onChange={(e) => setTeacher(e.target.value === 'teacher')}
            >
              <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
              <FormControlLabel value="student" control={<Radio />} label="Student" />
            </RadioGroup>
          </>
        )}

        <Button type="submit" variant="contained">
          {isRegister ? 'Register' : 'Login'}
        </Button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
