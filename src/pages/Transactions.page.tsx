import SubmitButton from "../components/buttons/SubmitButton.component";
import FormContainer from "../components/FormContainer.component";
import Input from "../components/inputs/Input.component";
import Table from "../components/Table.component";
import useStateOnForm from "../hooks/useStateOnForm.hook";
import {
  TransactionType,
  type TransactionDTO,
} from "../types/transaction.types";
import useQueryPersons from "../hooks/useQueryPersons.hook";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import TransactionService from "../services/transactions.service";
import Select from "../components/inputs/Select.component";
import { toast } from "react-toastify";
import axios from "axios";
import { CurrencyUtils } from "../utils/currency.util";
import { SCPageSkeleton, SCTableContainer } from "./styles";
import StatusBadge from "../components/StatusBadge.component";

const initialTransactionDTO: TransactionDTO = {
  type: TransactionType.Expense,
  description: "",
  personId: "",
  value: 0,
};

export default function TransactionsPage() {
  const { persons, isLoadingPersons } = useQueryPersons();

  const stateOnForm = useStateOnForm<TransactionDTO>(initialTransactionDTO);

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryFn: TransactionService.readAll,
    queryKey: [QUERY_KEYS.transactions],
  });

  const client = useQueryClient();
  const { mutate: createTransaction, isPending: isCreatingTransaction } =
    useMutation({
      mutationFn: (dto: TransactionDTO) => TransactionService.create(dto),
      onSuccess: () => {
        stateOnForm.setData(initialTransactionDTO);
        client.invalidateQueries({ queryKey: [QUERY_KEYS.transactions] });
        toast.success(`Transação criada com sucesso!`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.detail);
        }
      },
    });

  const isLoading =
    isLoadingPersons || isLoadingTransactions || isCreatingTransaction;

  const { personId, type } = stateOnForm.data;
  const isSelectedPersonMinor =
    persons?.find(({ id }) => id === personId)?.age < 18;

  const transactionTypeOptions = [
    { label: "despesa", value: TransactionType.Expense },
  ];
  if (!isSelectedPersonMinor) {
    transactionTypeOptions.push({
      label: "receita",
      value: TransactionType.Income,
    });
  }

  useEffect(() => {
    const isSelectedTypeIncome = type === TransactionType.Income;

    if (isSelectedPersonMinor && isSelectedTypeIncome) {
      stateOnForm.setData((prev) => ({
        ...prev,
        type: TransactionType.Expense,
      }));
    }
  }, [type, isSelectedPersonMinor]);

  return (
    <SCPageSkeleton>
      <FormContainer onSubmit={() => createTransaction(stateOnForm.data)}>
        <Select
          required
          label="Pessoa"
          stateOnForm={stateOnForm}
          field="personId"
          options={persons?.map(({ name, id }) => ({ label: name, value: id }))}
          isLoading={isLoading}
        />
        <Select
          required
          label="Tipo"
          stateOnForm={stateOnForm}
          field="type"
          options={transactionTypeOptions}
        />
        <Input
          required
          isLoading={isLoading}
          stateOnForm={stateOnForm}
          placeholder="Digite a descrição"
          label="descrição"
          field="description"
          type="text"
        />
        <Input
          required
          isLoading={isLoading}
          stateOnForm={stateOnForm}
          placeholder="Digite o valor"
          label="valor"
          field="value"
          type="number"
          min={1}
        />
        <SubmitButton isLoading={isLoading}>Criar transação</SubmitButton>
      </FormContainer>

      <SCTableContainer>
        <Table
          isLoading={isLoading}
          columns={[
            { key: "value", label: "Valor" },
            { key: "description", label: "Descrição" },
            { key: "personName", label: "Pessoa" },
            { key: "type", label: "Transação" },
          ]}
          items={transactions?.map(({ value, person, ...rest }) => ({
            ...rest,
            personName: person.name,
            value: CurrencyUtils.formatToBRL(value),
            type: (
              <StatusBadge
                color={rest.type === TransactionType.Expense ? "red" : "green"}
                text={
                  rest.type === TransactionType.Expense ? "despesa" : "receita"
                }
              />
            ),
          }))}
        />
      </SCTableContainer>
    </SCPageSkeleton>
  );
}
