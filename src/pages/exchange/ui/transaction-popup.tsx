import { x } from "@xstyled/styled-components"
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from "@ant-design/icons"
import FormatedCurrency from "@/shared/ui/formatted-currency"
import type { TransactionProps } from "@/entities/wallet"

type TransactionPopupProps = {
  state: "loading" | "success" | "failed" | "idle"
  transaction: TransactionProps
  onClose?: () => void
}
function TransactionPopup({
  state,
  transaction,
  onClose,
}: TransactionPopupProps) {
  return (
    <>
      <x.div
        data-testid="transaction-popup-backdrop"
        position="absolute"
        left="0"
        top="0"
        w="full"
        h="full"
        bg="rgba(0,0,0,.4)"
        zIndex="10"
        onClick={onClose}
        animation="fade-in-slow"
      />
      <x.div
        position="absolute"
        bottom="2rem"
        left="50%"
        w="calc(100% - 3rem)"
        transform
        translateX="-50%"
        bg="white"
        borderRadius="2rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py="4"
        zIndex="15"
        animation="fade-in"
      >
        <x.div fontSize="4rem" color="blue" display="flex">
          {state === "loading" && <LoadingOutlined />}
          {state === "success" && <CheckCircleTwoTone twoToneColor="#52c41a" />}
          {state === "failed" && (
            <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
          )}
        </x.div>

        <x.div pt="2" textAlign="center">
          {state === "loading" && (
            <span data-testid="transaction-loading-message">
              Processing your transaction
            </span>
          )}
          {state === "failed" && (
            <span data-testid="transaction-error-message">
              An error occured. Try again later
            </span>
          )}
          {state === "success" && (
            <span data-testid="transaction-success-message">
              <strong>You exchanged</strong>
              <br />
              <FormatedCurrency
                code={transaction.from}
                amount={transaction.amountFrom}
                round
              />
              {` to `}
              <FormatedCurrency
                code={transaction.to}
                amount={transaction.amountTo}
                round
              />
            </span>
          )}
        </x.div>
      </x.div>
    </>
  )
}

export default TransactionPopup
