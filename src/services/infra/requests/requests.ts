import { api } from '../api';
import { getEnv } from 'environment';
import { GetElections } from 'types/domain';

export const useInvestimentsApi = () => {
  const { URL_BASE } = getEnv();

  const getInvestiments = async () => {
    const res = await api.get<GetElections>(URL_BASE);
    return res.data;
  };

  return { getInvestiments };
};
