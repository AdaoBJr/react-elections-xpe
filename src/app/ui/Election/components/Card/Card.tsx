import React from 'react';
import { Grid, Paper, Stack } from '@mui/material';

import { CardProps } from 'types/shared';
import { Image, Text, Title } from 'app/shared';
import { SxContainerCard, SxImageCard, SxWrapperCard } from './styles';

export const Card: React.FC<CardProps> = ({
  votes,
  percent,
  elected,
  candidateImg,
  candidateName,
}) => {
  return (
    <Paper sx={SxContainerCard}>
      <Grid container sx={SxWrapperCard}>
        <Grid item xs={12} sm={6}>
          <Image src={candidateImg} alt={candidateName} sx={SxImageCard} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack rowGap={0.5} alignItems={'center'}>
            <Text variant="h3" children={`${percent}%`} />
            <Text variant="body1" children={`${votes} votos`} />
          </Stack>
        </Grid>
        <Grid item xs={12} margin={'1rem 0'}>
          <Title variant="h2" textAlign={'center'} children={candidateName} />
        </Grid>
        <Grid item xs={12}>
          <Text variant="h3" textAlign={'center'} children={elected} />
        </Grid>
      </Grid>
    </Paper>
  );
};
