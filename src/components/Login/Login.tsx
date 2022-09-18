import { Box, Button, TextField, Typography } from '@mui/material';
import { AuthError } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Routes } from '../../routes';

type TLoginForm = {email: string; password: string};
const initialLoginForm = {email: '', password: ''};

export const Login = () => {
  const [loginForm, setLoginForm] = useState<TLoginForm>(initialLoginForm);
  const {login} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    const {email, password} = loginForm;
    if (!password || !email) {
      return setError("Please input credentials");
    }
    setError('');
    setLoading(true);
    try {
      await login({email, password});
    } catch (e) {
      const err = e as AuthError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target: {value, name}}) => {
    setError('');
    setLoginForm({...loginForm, [name as keyof TLoginForm]: value});
  }

  return <>
    <Typography mb={2} align="center" variant="h4">Log in</Typography>
    <Box component='form' mb={1} display='flex' flexDirection='column' gap={1}>
      <TextField 
        fullWidth
        onChange={handleChange}
        value={loginForm.email}
        name="email"
        label="Email"
        type="email"
        variant='standard'
      />
      <TextField 
        fullWidth
        onChange={handleChange}
        value={loginForm.password}
        name="password"
        label="Password"
        type="password"
        variant='standard'
      />
      {<Typography my={2} color={'red'}>{error}</Typography>}
      <Button
        disabled={loading}
        type="submit"
        fullWidth 
        onClick={handleLogin}
        variant="contained">
          Log in
      </Button>
    </Box>
    <Typography align="center">
      Don't have an account yet? <Link to={Routes.SignUp}>Sign up!</Link>
    </Typography>
  </>
}