import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '../../routes';
import { useAuth } from '../../contexts/AuthContext';

const MainContainer = styled('div')`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2) ,
  maxWidth: "400px",
  width: "100%"
}));

export const SignUpLayout = () => {
  const {currentUser} = useAuth(); 

  return <MainContainer>
    {currentUser && <Navigate to={Routes.Dashboard} replace />}
    <FormContainer elevation={2}>
      <Outlet />
    </FormContainer>
  </MainContainer>
}