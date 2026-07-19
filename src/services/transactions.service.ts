import type {
  TransactionDTO,
  TransactionResponse,
} from "../types/transaction.types";
import { api } from "./api.service";

const route = "transaction";

export default class TransactionService {
  public static async readAll() {
    const transactions = await api.get<TransactionResponse[]>(route);
    return transactions.data;
  }

  public static async create(dto: TransactionDTO) {
    const transaction = await api.post<TransactionResponse>(route, dto);
    return transaction.data;
  }
}
