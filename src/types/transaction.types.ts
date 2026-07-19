import type { PersonResponse } from "./person.type";

export enum TransactionType {
  Expense = 1,
  Income = 2,
}

export type TransactionDTO = {
  description: string;
  value: number;
  type: TransactionType;
  personId: string;
};

export type TransactionResponse = Omit<TransactionDTO, "personId"> & {
  id: string;
  person: PersonResponse;
};
