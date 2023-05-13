import React from 'react';
import { Stack } from '@mui/material';

import { Body } from './components';
import { Text, Title } from 'app/shared';
import { useElection } from 'services/talons';

export const Election: React.FC = () => {
  const {
    compProps: { title, voting, presence, absence, numberCandidates },
  } = useElection();

  return (
    <Body>
      <Title {...title} />
      <Stack
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        columnGap={1}
      >
        <Title {...voting} />
        <Title {...absence} />
        <Title {...presence} />
      </Stack>
      <Text {...numberCandidates} />
    </Body>
  );
};
