import { KeyboardEventHandler, ChangeEventHandler } from "react"
import FormatedCurrency from "@/shared/ui/formatted-currency"
import AmountInput from "@/shared/ui/amount-input"
import CurrencySelect from "./currency-select"
import { x } from "@xstyled/styled-components"

type ExchangeWidgetProps = {
  currency: CurrencyCode
  omitCurrency?: CurrencyCode
  balance: number | undefined
  prefix: "+" | "–"
  amount: number | null
  onChangeAmount?: (amount: number | null) => void
  onChangeCurrency?: ChangeEventHandler<HTMLSelectElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  error?: string | null
}

export function ExchangeWidget({
  currency,
  omitCurrency,
  balance,
  prefix,
  onChangeAmount,
  onChangeCurrency,
  amount,
  onKeyDown,
  error,
}: ExchangeWidgetProps) {
  return (
    <x.div
      data-testid="exchange-widget"
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="7rem"
      bg="white"
      borderRadius="1rem"
      p="2"
    >
      <x.div
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <CurrencySelect
          value={currency}
          onChange={onChangeCurrency}
          omit={omitCurrency}
        />
        <x.div fontWeight="medium" fontSize="1.2rem" color="gray-500">
          {"Balance: "}
          {balance !== undefined && (
            <FormatedCurrency code={currency} amount={balance} round />
          )}
        </x.div>
      </x.div>
      <x.div textAlign="right">
        <AmountInput
          onChange={onChangeAmount}
          value={amount}
          prefix={prefix}
          onKeyDown={onKeyDown}
        />
        {error && (
          <x.div color="red" fontWeight="medium" fontSize="1.2rem" pt="1">
            {error}
          </x.div>
        )}
      </x.div>
    </x.div>
  )
}
