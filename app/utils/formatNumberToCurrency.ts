export type Currency = "NGN" | "USD";

// export function formatNumberToCurrency(
//   value: number,
//   options: Intl.NumberFormatOptions = {},
//   locale: "en-NG" | "en-US" = "en-NG",
// ) {
//   return new Intl.NumberFormat(locale, options).format(value);
// }

export const currencyLocaleMap: Record<Currency, "en-NG" | "en-US"> = {
  NGN: "en-NG",
  USD: "en-US",
};

export function formatNumberToCurrency(
  value: number,
  currency: Currency,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat(currencyLocaleMap[currency], {
    style: "currency",
    currency,
    ...options,
  }).format(value);
}
