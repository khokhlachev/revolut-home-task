import UISelect, { UISelectProps, UISelectOptions } from "@/shared/ui/select"
import { useAppSelector } from "@/app/hooks"
import { formatAmount, getCurrencySymbol } from "@/shared/lib"
import { x } from "@xstyled/styled-components"

type CurrencySelectProps = Omit<UISelectProps, "options"> & {
  value: CurrencyCode
  omit?: CurrencyCode
}
function CurrencySelect({ omit, ...rest }: CurrencySelectProps) {
  const options = useAppSelector(({ rates, wallet }) => {
    if (!rates.exchangeRates) {
      return []
    }

    return (Object.keys(rates.exchangeRates) as CurrencyCode[])
      .filter((key) => key !== omit)
      .sort((a, b) => {
        return (wallet.balances[b] || 0) - (wallet.balances[a] || 0)
      })
      .reduce((acc, key) => {
        const amount = wallet.balances[key]

        acc.push({
          value: key,
          label: `${key}${
            amount !== undefined && amount > 0
              ? ` (${getCurrencySymbol(key)}${formatAmount(amount)})`
              : ""
          }`,
        })

        return acc
      }, [] as UISelectOptions)
  })

  return (
    <x.div fontSize="2rem" fontWeight="bold" lineHeight="1">
      <UISelect options={options} {...rest} />
    </x.div>
  )
}

export default CurrencySelect
