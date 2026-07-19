import type { PersonResponse } from "./person.type";

type Total = { income: number; expense: number; balance: number };

export type TotalsResponse = {
  persons: (Total & Pick<PersonResponse, "name">)[];
  total: Total;
};
