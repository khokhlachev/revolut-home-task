import { ComponentPropsWithoutRef } from "react"
import { Button } from "antd"
import { ExchangeAction } from "../types"

const getBuyMessage = (from: CurrencyCode, to: CurrencyCode) =>
  `Buy ${to} with ${from}`
const getSellMessage = (from: CurrencyCode, to: CurrencyCode) =>
  `Sell ${from} for ${to}`

type TransactionButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "type"
> & {
  action: ExchangeAction
  from: CurrencyCode
  to: CurrencyCode
}
export function TransactionButton({
  action,
  from,
  to,
  ...rest
}: TransactionButtonProps) {
  return (
    <Button
      {...rest}
      type="primary"
      block
      size="large"
      shape="round"
      data-testid="transaction-button"
    >
      {action === "buy" ? getBuyMessage(from, to) : getSellMessage(from, to)}
    </Button>
  )
}
