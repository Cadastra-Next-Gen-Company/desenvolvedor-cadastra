export function formatedPrice({ price }: { price: number }): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}