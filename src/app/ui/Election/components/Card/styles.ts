import { SxProps, Theme } from '@mui/material';

export const SxContainerCard: SxProps<Theme> = {
  p: 1,
  boxShadow: ({ shadows }) => shadows[2],
};

export const SxWrapperCard: SxProps<Theme> = {
  width: { xs: '100%', sm: '200px' },
};

export const SxImageCard: SxProps<Theme> = {
  borderRadius: '100%',
  width: '70px',
  height: '70px',
  margin: { xs: '1rem auto', sm: 'inherit' },
};
