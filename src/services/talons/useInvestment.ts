import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { invest } from 'articles';
import { TitleProps } from 'types/shared';
import { GetInvestments } from 'types/domain';

interface LocationState {
  state: GetInvestments;
}

interface ParamId {
  [id: string]: string;
}

const fixedDigits = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const useInvestment = () => {
  const param = useParams<ParamId>();
  const location = useLocation() as LocationState;

  const title = useMemo(
    () =>
      location.state.investments.find((item) => item.id === String(param.id))
        ?.description,
    [location.state, param.id]
  );

  const investments = useMemo(() => {
    const resultsByParamId = location.state.reports
      .filter((item) => item.investmentId === param.id)
      .sort((a, b) => a.month - b.month);

    return resultsByParamId.map(({ month, year, value }, i, array) => {
      const calcRevenue = parseInt(
        `${
          i === 0
            ? 0
            : (((value - array[i - 1].value) / array[i - 1].value) * 100).toPrecision(3)
        }`
      ).toLocaleString('pt-BR', fixedDigits);

      return {
        date: dayjs(`${year}-${month}-01`).format('MMM/YYYY'),
        value: `${value.toLocaleString('pt-BR', fixedDigits)}`,
        revenue: parseInt(calcRevenue) <= 0 ? calcRevenue : `+${calcRevenue}`,
        isNegative: parseInt(calcRevenue) < 0,
      };
    });
  }, [location.state, param.id]);

  const totals = useMemo(() => {
    const valueDez = parseFloat(investments[11].value.replace('.', '').replace(',', '.'));
    const valueJan = parseFloat(investments[0].value.replace('.', '').replace(',', '.'));

    const totalRevenue = (((valueDez - valueJan) / valueJan) * 100).toLocaleString(
      'pt-BR',
      fixedDigits
    );

    const totalValue = (valueDez - valueJan).toLocaleString('pt-BR', fixedDigits);

    const totalRevenueFormatted =
      parseInt(totalRevenue) <= 0 ? totalRevenue : `+${totalRevenue}`;

    const value = `R$ ${totalValue} (${totalRevenueFormatted}%)`;
    const isNegative = parseInt(totalRevenue) <= 0;

    return { value, isNegative };
  }, [investments]);

  const compProps = useMemo(
    () => ({
      title: {
        children: title,
        variant: 'h1',
        textAlign: 'center',
      } as TitleProps,
      subTitle: {
        children: invest.subTitle,
        variant: 'h2',
        textAlign: 'center',
      } as TitleProps,
      totalRevenue: {
        children: totals.value,
        variant: 'h2',
        textAlign: 'center',
        color: totals.isNegative ? 'error.main' : 'success.main',
      } as TitleProps,
    }),
    [title, totals]
  );

  return { investments, compProps };
};
