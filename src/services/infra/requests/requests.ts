import { api } from '../api';
import { getEnv } from 'environment';
import { GetElection } from 'types/domain';

export const useElectionApi = () => {
  const { URL_BASE } = getEnv();

  const getElection = async () => {
    const res = await api.get<GetElection>(URL_BASE);
    return res.data;
  };

  return { getElection };
};
