import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, FormControlLabel, Radio, RadioGroup, Switch, InputLabel, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login, register } from '../../store/slices/authSlice';

import './login-page.scss';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading } = useSelector(state => state.auth);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        await dispatch(register({ name, email, password, teacher })).unwrap();
        setIsRegister(false);
        setError('');
      } else {
        await dispatch(login({ email, password })).unwrap();
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'An error occurred');
    }
  };
  const [errorLength, setErrorLength] = useState(false);
  let styles = isRegister ? 'reg-log__form' : 'reg-log__form heigth40';
  return (
    <div className="reg-log__wrapper">
      <form className={styles} onSubmit={handleFormSubmit}>
        <FormControlLabel
          control={<Switch checked={isRegister} onChange={(e) => setIsRegister(e.target.checked)} />}
          label={isRegister ? 'Sign up' : 'Log in' }
          style={{color: '#000'}}
        />
        {!isRegister ? (
          <>
            <InputLabel>Email</InputLabel>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => {setErrorLength(true)}}
              onBlur={() =>{setErrorLength(false)}}
              error={errorLength && email.length===0}
              autoComplete="username"
            />
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width: '63%'}}
              onFocus={() => {setErrorLength(true)}}
              onBlur={() =>{setErrorLength(false)}}
              error={errorLength && password.length===0}
              autoComplete="current-password"
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            />
          </>
        ) : (
          <>
            <InputLabel>Name</InputLabel>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              onFocus={() => {setErrorLength(true)}}
              onBlur={() =>{setErrorLength(false)}}
              error={errorLength && name.length===0}
              autoComplete="name"
            />
            <InputLabel>Email</InputLabel>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => {setErrorLength(true)}}
              onBlur={() =>{setErrorLength(false)}}
              error={errorLength && email.length===0}
              autoComplete="username"
            />
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{width: '63%'}}
              autoComplete="new-password"
              onFocus={() => {setErrorLength(true)}}
              onBlur={() =>{setErrorLength(false)}}
              error={errorLength && password.length===0}
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
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
