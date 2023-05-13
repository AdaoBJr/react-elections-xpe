import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { electionInfo } from 'articles';
import { GetElection } from 'types/domain';
import { CardProps, TextProps, TitleProps } from 'types/shared';

import Thor from 'assets/images/thor.png';
import Flash from 'assets/images/flash.png';
import Antman from 'assets/images/antman.png';
import Batman from 'assets/images/batman.png';
import IronMan from 'assets/images/ironMan.png';
import Aquaman from 'assets/images/aquaman.png';
import Superman from 'assets/images/superman.png';
import SpiderMan from 'assets/images/spiderMan.png';
import BlackWidow from 'assets/images/blackWidow.png';
import WonderWoman from 'assets/images/wonderWoman.png';
import GreenLantern from 'assets/images/greenLantern.png';
import CaptainMarvel from 'assets/images/captainMarvel.png';
import CaptainAmerica from 'assets/images/captainAmerica.png';

interface LocationState {
  state: GetElection;
}

interface ParamId {
  [city: string]: string;
}

const fixedDigits = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const useElection = () => {
  const param = useParams<ParamId>();
  const location = useLocation() as LocationState;

  const electionInfoCity = useMemo(
    () => location.state.cities.find(({ name }) => name === param.city),
    [location.state]
  );

  const electionData = useMemo(
    () => location.state.election.filter((item) => item.cityId === electionInfoCity?.id),
    [electionInfoCity, location.state.election]
  );

  const candidates = useMemo(() => {
    const candidatesInElection = electionData.map(({ candidateId }) => candidateId);
    return location.state.candidates.filter((item) =>
      candidatesInElection.includes(item.id)
    );
  }, [electionData, location.state.election]);

  const cardInfo = useMemo<CardProps[]>(() => {
    const info = electionData.map(({ candidateId, votes }) => {
      const percent = ((votes / electionInfoCity!.presence) * 100).toLocaleString(
        'pt-BR',
        fixedDigits
      );

      const candidateName = candidates.find(({ id }) => id === candidateId)?.name!;
      const listImage: { [value: string]: string } = {
        Thor,
        Flash,
        Antman,
        Batman,
        IronMan,
        Aquaman,
        Superman,
        SpiderMan,
        BlackWidow,
        WonderWoman,
        GreenLantern,
        CaptainAmerica,
        CaptainMarvel,
      };
      const candidateImg = listImage[candidateName];

      return {
        candidateName,
        candidateImg,
        percent,
        votes,
      };
    });

    return info
      .sort((a, b) => b.votes - a.votes)
      .map((info, i) => ({ ...info, elected: i === 0 ? 'Eleito' : 'Não Eleito' }));
  }, [electionData, candidates, electionInfoCity?.presence]);

  const compProps = useMemo(
    () => ({
      title: {
        children: `${electionInfo.title}${param.city}`,
        variant: 'h1',
        textAlign: 'center',
      } as TitleProps,
      voting: {
        children: `${electionInfo.total.votingPopulation}: ${electionInfoCity?.votingPopulation}`,
        variant: 'h2',
        textAlign: 'center',
      } as TitleProps,
      presence: {
        children: `${electionInfo.total.presence}: ${electionInfoCity?.presence}`,
        variant: 'h2',
        textAlign: 'center',
      } as TitleProps,
      absence: {
        children: `${electionInfo.total.absence}: ${electionInfoCity?.absence}`,
        variant: 'h2',
        textAlign: 'center',
      } as TitleProps,
      numberCandidates: {
        children:
          electionData.length > 0
            ? `${electionData.length} candidatos`
            : `${electionData.length} candidato`,
        variant: 'body1',
        textAlign: 'center',
      } as TextProps,
      cardInfo,
    }),
    [electionData, electionInfoCity, cardInfo]
  );

  return { compProps };
};
