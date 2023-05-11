import React, { PropsWithChildren } from 'react';
import { Box, Paper } from '@mui/material';

import { GridContainer } from 'app/shared';
import { PaperWrapperInvestment } from './styles';

export const BodyInvestiment: React.FC<PropsWithChildren> = ({ children }) => (
  <Box sx={GridContainer}>
    <Paper sx={PaperWrapperInvestment}>{children}</Paper>
  </Box>
);
