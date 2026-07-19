import type { TotalsResponse } from "../types/totals.types";
import { api } from "./api.service";

const route = "totals";

export default class TotalsService {
  public static async getAll() {
    const response = await api.get<TotalsResponse>(route);
    return response.data;
  }
}
