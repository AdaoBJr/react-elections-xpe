import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { home } from 'articles';
import { GetElection } from 'types/domain';
import { useElectionApi } from 'services/infra';
import homeAnimation from 'assets/animations/home.json';
import loadingAnimation from 'assets/animations/loading.json';
import {
  AnimationProps,
  TitleProps,
  DropdownProps,
  DropdownItems,
  TextProps,
} from 'types/shared';
import { ButtonProps } from '@mui/material';

export const useHome = () => {
  const navigate = useNavigate();
  const { getElection } = useElectionApi();

  const [data, setData] = useState<GetElection | null>(null);
  const [dropdownValue, setDropdownValue] = useState<string>('');

  const getData = async () => setData(await getElection());

  const handleSelectOnBlur = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setDropdownValue(value);

  const handleRedirect = () => navigate(`/election/${dropdownValue}`, { state: data });

  const dropItems: DropdownItems[] | undefined = useMemo(
    () =>
      data?.cities.map(({ name }) => ({
        value: name,
        label: name,
      })),
    [data]
  );

  const compProps = useMemo(
    () => ({
      loadingAnimation: {
        animation: loadingAnimation,
        alt: 'animação-loading',
        center: true,
        width: '300px',
      } as AnimationProps,
      homeAnimation: {
        animation: homeAnimation,
        alt: 'animação-home',
        center: true,
        width: '300px',
      } as AnimationProps,
      title: {
        children: home.title,
        variant: 'h1',
        textAlign: 'center',
      } as TitleProps,
      label: {
        children: home.subTitle,
        variant: 'body2',
        fontSize: '1rem',
        textAlign: 'center',
      } as TextProps,
      dropdown: {
        name: 'dropdown_election',
        defaultValue: '',
        label: !dropdownValue && home.placeholder,
        fullWidth: true,
        options: dropItems,
        onBlur: handleSelectOnBlur,
      } as DropdownProps,
      button: {
        children: home.button,
        fullWidth: true,
        disabled: !dropdownValue,
        onClick: handleRedirect,
        sx: {
          maxHeight: '40px',
          color: 'common.white',
          fontWeight: 700,
          fontSize: '1rem',
        },
      } as ButtonProps,
    }),
    [dropdownValue, dropItems]
  );

  useEffect(() => {
    getData();
  }, []);

  return { data, compProps };
};
