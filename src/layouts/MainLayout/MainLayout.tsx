import React from 'react';
import Box from '@mui/material/Box';

import { MainAppBar } from '../../components/AppBar/AppBar';
import { DrawerHeader } from '../../components/DrawerHeader/DrawerHeader';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Routes } from '../../routes';


export const MainLayout: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const {currentUser} = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {!currentUser && <Navigate to={Routes.SignUp} replace />}
      <MainAppBar open={open} onOpen={handleDrawerOpen} />
      <Sidebar open={open} onClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <main id="main">
          <Outlet />
        </main>
      </Box>
    </Box>
  );
}
