import React from 'react';
import { Stack } from '@mui/material';

import { Body, Card } from './components';
import { Text, Title } from 'app/shared';
import { SxCardsElections } from './styles';
import { useElection } from 'services/talons';

export const Election: React.FC = () => {
  const {
    compProps: { title, voting, presence, absence, numberCandidates, cardInfo },
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
      <Stack sx={SxCardsElections}>
        {cardInfo.map((cardProps) => (
          <Card key={cardProps.candidateName} {...cardProps} />
        ))}
      </Stack>
    </Body>
  );
};
