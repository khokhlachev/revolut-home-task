import getSymbolFromCurrency from "currency-symbol-map"
import compose from "compose-function"

export function roundNumber(number: number): string {
  return number.toFixed(2)
}

export const formatNumber = (
  n: number | string,
  fraction = 3,
  chars = ","
): string => {
  let [s, decimalPlaces] = (typeof n === "number" ? `${n}` : n).split(".")

  if (s.length < fraction) {
    return `${s}${decimalPlaces ? `.${decimalPlaces}` : ""}`
  }

  const len = s.length

  for (let i = len - fraction; i > 0; i -= fraction) {
    s = `${s.slice(0, i)}${chars}${s.slice(i)}`
  }

  return `${s}${decimalPlaces ? `.${decimalPlaces}` : ""}`
}

export const formatAmount = compose(formatNumber, roundNumber)

export function getCurrencySymbol(code: CurrencyCode) {
  return getSymbolFromCurrency(code) ?? ""
}

export function getEnv(key: string) {
  if (process.env[key] === undefined) {
    throw new TypeError(`process.env.${key} is undefined`)
  }

  return process.env[key]
}
