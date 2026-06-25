export function formatNumberToCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale: string = "en-NG",
) {
  return new Intl.NumberFormat(locale, options).format(value);
}
