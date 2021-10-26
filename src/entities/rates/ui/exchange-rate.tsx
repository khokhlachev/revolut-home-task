import { useAppSelector } from "@/app/hooks"
import { selectRateByCode } from "../slice"
import { Skeleton } from "antd"
import { x } from "@xstyled/styled-components"
import FormatedCurrency from "@/shared/ui/formatted-currency"
import { StockOutlined } from "@ant-design/icons"

type Props = {
  currency: CurrencyCode
}
export function ExchangeRate({ currency }: Props) {
  const baseCurrency = useAppSelector(({ rates }) => rates.currencyCode)
  const rate = useAppSelector((state) => selectRateByCode(state, currency))
  const requestStatus = useAppSelector(({ rates }) => rates.status)

  if (requestStatus === "failed") {
    return <x.div color="red">failed to fetch</x.div>
  }

  return (
    <x.div color="blue" fontWeight="medium">
      <x.span mr="1">
        <StockOutlined />
      </x.span>
      {requestStatus === "loading" || rate === undefined ? (
        <Skeleton.Button active size="small" />
      ) : (
        <>
          <span>
            <FormatedCurrency code={baseCurrency} amount={1} />
            {` = `}
          </span>
          <span
            data-testid="exchange-rate"
            data-currency={currency}
            data-rate={rate}
          >
            <FormatedCurrency code={currency} amount={rate} />
          </span>
        </>
      )}
    </x.div>
  )
}
