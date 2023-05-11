import React from 'react';
import { Box, Divider, Stack } from '@mui/material';

import { Text, Title } from 'app/shared';
import { SxDividerUi } from './styles';
import { BodyInvestiment } from './components';
import { useInvestment } from 'services/talons';

export const Investment: React.FC = () => {
  const {
    investments,
    compProps: { title, subTitle, totalRevenue },
  } = useInvestment();

  return (
    <BodyInvestiment>
      <Box>
        <Title {...title} />
        <Stack flexDirection={'row'} justifyContent={'center'} mt={0.5} columnGap={0.5}>
          <Title {...subTitle} />
          <Title {...totalRevenue} />
        </Stack>
        <Box mt={1}>
          <Divider sx={SxDividerUi} />
        </Box>
      </Box>
      {investments.map((item, i) => (
        <Box key={item.date}>
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Stack flexDirection={'row'} alignItems={'center'} columnGap={3.75}>
              <Text children={item.date} fontWeight={800} width={'70px'} />
              <Text
                children={`R$ ${item.value}`}
                fontWeight={700}
                fontSize={'1rem'}
                color={item.isNegative ? 'error.main' : 'success.main'}
              />
            </Stack>
            <Text
              children={item.revenue}
              fontWeight={700}
              fontSize={'1rem'}
              color={item.isNegative ? 'error.main' : 'success.main'}
            />
          </Stack>
          {investments.length - 1 !== i && (
            <Box mt={0.35}>
              <Divider sx={SxDividerUi} />
            </Box>
          )}
        </Box>
      ))}
    </BodyInvestiment>
  );
};
