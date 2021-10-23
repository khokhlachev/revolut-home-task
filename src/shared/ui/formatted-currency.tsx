import { getCurrencySymbol, formatAmount, formatNumber } from "@/shared/lib"

type FormatedCurrencyProps = {
  code: CurrencyCode
  amount: number
  round?: boolean
}

function FormatedCurrency({ code, amount, round }: FormatedCurrencyProps) {
  return (
    <>{`${getCurrencySymbol(code)}${
      round ? formatAmount(amount) : formatNumber(amount)
    }`}</>
  )
}

export default FormatedCurrency
