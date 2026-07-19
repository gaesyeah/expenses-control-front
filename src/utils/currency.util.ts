export class CurrencyUtils {
  static formatToBRL(value: number | undefined) {
    return value?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
