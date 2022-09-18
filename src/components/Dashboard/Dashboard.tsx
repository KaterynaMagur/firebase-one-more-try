import React from 'react';
import { Box, Typography } from "@mui/material";
import { useAuth } from '../../contexts/AuthContext';
import { ProductItems } from '../ProductItems/ProductItems';

export const Dashboard = () => {
  const {currentUser} = useAuth();
  return <Box>
    <Typography variant="h4">Welcome, {currentUser?.displayName ?? "Guest"}</Typography>
    <ProductItems />
  </Box>
}