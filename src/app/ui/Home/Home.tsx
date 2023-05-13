import React from 'react';
import { Button, Grid } from '@mui/material';

import { BodyHome } from './components';
import { useHome } from 'services/talons';
import { Title, Animation, Text, Dropdown } from 'app/shared';

export const Home: React.FC = () => {
  const {
    data,
    compProps: {
      loadingAnimation,
      homeAnimation,
      title, label, dropdown, button
    },
  } = useHome();

  if (!data)
    return (
      <BodyHome>
        <Animation {...loadingAnimation} />
      </BodyHome>
    );

  return (
    <BodyHome>
      <Animation {...homeAnimation} />
      <Title {...title} />
      <Text {...label} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Dropdown {...dropdown} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button {...button} />
        </Grid>
      </Grid>
    </BodyHome>
  );
};
