import { SxProps, Theme } from '@mui/material';
import { PaperWrapper } from 'app/shared';

export const PaperWrapperElection: SxProps<Theme> = {
  ...PaperWrapper,
  justifyContent: 'stretch',
  height: '100%',
};
