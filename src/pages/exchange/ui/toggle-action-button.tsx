import { MouseEventHandler } from "react"
import { x } from "@xstyled/styled-components"
import { ArrowDownOutlined } from "@ant-design/icons"
import type { ExchangeAction } from "../types"

type ToggleActionButtonProps = {
  action: ExchangeAction
  onClick: MouseEventHandler
}
export function ToggleActionButton({
  action,
  onClick,
}: ToggleActionButtonProps) {
  return (
    <x.button
      data-testid="toggle-exchange-action"
      position="relative"
      zIndex="5"
      display="block"
      color="blue"
      bg="white"
      border="3"
      borderColor="gray"
      borderRadius="100%"
      p="0"
      w="3rem"
      h="3rem"
      fontSize="12px"
      my="-1rem"
      mx="auto"
      transform
      rotate={action === "buy" ? "180deg" : "0"}
      transformOrigin="center"
      onClick={onClick}
    >
      <x.span position="relative" top="-1px">
        <ArrowDownOutlined />
      </x.span>
    </x.button>
  )
}
