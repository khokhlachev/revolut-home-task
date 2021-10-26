import { useCallback, useState } from "react"
import { TransactionButton } from "./transaction-button"
import { walletSlice, TransactionProps } from "@/entities/wallet"
import { useAppDispatch } from "@/app/hooks"
import type { ExchangeAction } from "../types"
import TransactionPopup from "./transaction-popup"

type ExchangeTransactionProps = {
  action: ExchangeAction
  disabled: boolean
  transaction: TransactionProps
  onClose?: () => void
}
export function ExchangeTransaction({
  action,
  disabled,
  transaction,
  onClose,
}: ExchangeTransactionProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "failed">(
    "idle"
  )
  const [popupOpen, setPopupOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleTransactionCommit = async () => {
    setState("loading")
    setPopupOpen(true)
    const result = await dispatch(
      walletSlice.commitTransactionAsync(transaction)
    )
    if (walletSlice.commitTransactionAsync.fulfilled.match(result)) {
      setState("success")
    } else {
      setState("failed")
    }
  }

  const handleClose = useCallback(() => {
    setPopupOpen(false)
    onClose?.call(null)
  }, [onClose])

  return (
    <div>
      <TransactionButton
        action={action}
        from={transaction.from}
        to={transaction.to}
        disabled={disabled}
        onClick={handleTransactionCommit}
      />
      {popupOpen && (
        <TransactionPopup
          state={state}
          transaction={transaction}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
