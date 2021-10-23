import { ComponentPropsWithoutRef } from "react"
import { Button } from "antd"
import { ExchangeAction } from "../types"

const getBuyMessage = (from: CurrencyCode, to: CurrencyCode) =>
  `Buy ${to} with ${from}`
const getSellMessage = (from: CurrencyCode, to: CurrencyCode) =>
  `Sell ${from} for ${to}`

type ExchangeButtonProps = Omit<ComponentPropsWithoutRef<"button">, "type"> & {
  action: ExchangeAction
  from: CurrencyCode
  to: CurrencyCode
}
export function ExchangeButton({
  action,
  from,
  to,
  ...rest
}: ExchangeButtonProps) {
  return (
    <Button {...rest} type="primary" block size="large" shape="round">
      {action === "buy" ? getBuyMessage(from, to) : getSellMessage(from, to)}
    </Button>
  )
}
