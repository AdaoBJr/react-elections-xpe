import React, { PropsWithChildren } from 'react';
import { Box, Paper } from '@mui/material';

import { GridContainer } from 'app/shared';
import { PaperWrapperElection } from './styles';

export const Body: React.FC<PropsWithChildren> = ({ children }) => (
  <Box sx={GridContainer}>
    <Paper sx={PaperWrapperElection}>{children}</Paper>
  </Box>
);
