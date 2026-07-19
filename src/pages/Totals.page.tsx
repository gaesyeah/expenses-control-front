import { useQuery } from "@tanstack/react-query";
import TotalsService from "../services/totals.service";
import { QUERY_KEYS } from "../constants/queryKeys";
import Table from "../components/Table.component";
import { CurrencyUtils } from "../utils/currency.util";
import { SCPageSkeleton, SCTableContainer } from "./styles";
import styled from "styled-components";

export default function TotalsPage() {
  const { formatToBRL } = CurrencyUtils;

  const {
    data: { persons, total: { balance, expense, income } = {} } = {},
    isLoading,
  } = useQuery({
    queryFn: TotalsService.getAll,
    queryKey: [QUERY_KEYS.totals],
  });

  return (
    <SCPageSkeleton>
      <SCTableContainer>
        <SCSummaryContainer $balance={balance}>
          <p>
            Receita: <span>{formatToBRL(income)}</span>
          </p>
          <p>
            Despesas: <span>{formatToBRL(expense)}</span>
          </p>
          <p>
            Total: <span>{formatToBRL(balance)}</span>
          </p>
        </SCSummaryContainer>
        <Table
          isLoading={isLoading}
          columns={[
            { key: "name", label: "Nome" },
            { key: "income", label: "Receita" },
            { key: "expense", label: "Despesas" },
            { key: "balance", label: "Total" },
          ]}
          items={persons?.map(({ balance, expense, income, ...rest }, i) => ({
            ...rest,
            id: i.toString(),
            balance: formatToBRL(balance),
            expense: formatToBRL(expense),
            income: formatToBRL(income),
          }))}
        />
      </SCTableContainer>
    </SCPageSkeleton>
  );
}

const SCSummaryContainer = styled.div<{ $balance: number }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 10px;

  p {
    font-size: 17px;
    font-weight: 500;
  }

  p:last-child span {
    color: ${({
      $balance,
      theme: {
        colors: {
          background: { negative, positive },
        },
      },
    }) => {
      if ($balance < 0) return negative;
      if ($balance > 0) return positive;
      return undefined;
    }};
  }
`;
