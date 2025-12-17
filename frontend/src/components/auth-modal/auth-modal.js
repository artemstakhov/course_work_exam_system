import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment,
  Alert,
  Box,
  Typography,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login, register } from '../../store/slices/authSlice';
import './auth-modal.scss';

function AuthModal({ open, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector(state => state.auth);
  
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (tab === 0) {
        await dispatch(login({ email, password })).unwrap();
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        await dispatch(register({ name, email, password, teacher })).unwrap();
        setTab(0);
        setError('');
        setName('');
        setPassword('');
      }
    } catch (err) {
      setError(err.message || 'Щось пішло не так');
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    setTeacher(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <IconButton
          className="auth-modal__close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <div className="auth-modal__content">
          <Typography variant="h4" className="auth-modal__title">
            {tab === 0 ? 'Вхід' : 'Реєстрація'}
          </Typography>

          <Tabs 
            value={tab} 
            onChange={handleTabChange}
            className="auth-modal__tabs"
            variant="fullWidth"
          >
            <Tab label="Вхід" />
            <Tab label="Реєстрація" />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit} className="auth-modal__form">
            {error && (
              <Alert severity="error" className="auth-modal__error">
                {error}
              </Alert>
            )}

            {tab === 1 && (
              <>
                <TextField
                  label="Ім'я"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant="outlined"
                  className="auth-modal__input"
                />
                <FormControlLabel
                  control={
                    <Switch 
                      checked={teacher} 
                      onChange={(e) => setTeacher(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Я викладач"
                  className="auth-modal__switch"
                />
              </>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              className="auth-modal__input"
            />

            <TextField
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              className="auth-modal__input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              className="auth-modal__submit"
            >
              {loading ? 'Зачекайте...' : (tab === 0 ? 'Увійти' : 'Зареєструватися')}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
