import { 
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { SignUpLayout } from './layouts/SignUpLayout/SignUpLayout';
import { Routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';


const router = createBrowserRouter([
  {
    path: Routes.Auth,
    element: <SignUpLayout />,
    children: [
      {
        path: Routes.SignUp,
        element: <SignUp />
      },
      {
        path: Routes.Login,
        element: <Login />
      },
      {
        path: "*",
        index: true,
        element: <Navigate to={Routes.SignUp} replace />
      }
    ]
  },
  {
    path: Routes.Home,
    element: <MainLayout />,
    children: [
      {
        path: Routes.Dashboard,
        element: <Dashboard />
      },
      {
        path: "/",
        element: <Navigate to={Routes.Dashboard} replace />
      },
      {
        path: "*",
        element: <Navigate to={Routes.Dashboard} replace />
      }
    ]
  }
]);

const theme = createTheme();

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
