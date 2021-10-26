import { useState, useCallback, useMemo, useEffect } from "react"
import { PhoneMockup } from "@/shared/ui/phone-mockup"
import { ExchangeWidget, ExchangeTransaction, ToggleActionButton } from "./ui"
import { ratesSlice, ExchangeRate } from "@/entities/rates"
import { walletSlice } from "@/entities/wallet"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { x } from "@xstyled/styled-components"
import { useRatesPolling } from "./lib"
import type { ExchangeAction } from "./types"

function ExchangePage() {
  const [exchangeAction, setExchangeAction] = useState<ExchangeAction>("sell")
  const [altCurrency, setAltCurrency] = useState<CurrencyCode>("EUR")
  const [baseAmount, setBaseAmount] = useState<number | null>(null)
  const [altAmount, setAltAmount] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  const baseCurrency = useAppSelector((state) =>
    ratesSlice.selectCurrencyCode(state)
  )
  const baseBalance = useAppSelector((state) =>
    walletSlice.selectBalanceByCode(state, baseCurrency)
  )
  const altBalance = useAppSelector((state) =>
    walletSlice.selectBalanceByCode(state, altCurrency)
  )
  const exchangeRate = useAppSelector((state) =>
    ratesSlice.selectRateByCode(state, altCurrency)
  )

  useEffect(() => {
    dispatch(ratesSlice.fetchRatesAsync(baseCurrency))
  }, [dispatch])
  useRatesPolling(baseCurrency)

  useEffect(() => {
    setBaseAmount(null)
    setAltAmount(null)
  }, [baseCurrency, altCurrency])

  const baseAmountExceeds =
    exchangeAction === "sell" && (baseAmount || 0) > (baseBalance || 0)
  const altAmountExceeds =
    exchangeAction === "buy" && (altAmount || 0) > (altBalance || 0)

  const handleFirstInputChange = useCallback(
    function (value: number | null) {
      if (value === null) {
        setBaseAmount(null)
        setAltAmount(null)
      } else {
        setBaseAmount(value)
        setAltAmount(value * exchangeRate)
      }
    },
    [exchangeRate]
  )
  const handleSecondInputChange = useCallback(
    function (value: number | null) {
      if (value === null) {
        setBaseAmount(null)
        setAltAmount(null)
      } else {
        setAltAmount(value)
        setBaseAmount(value / exchangeRate)
      }
    },
    [exchangeRate]
  )
  const handleToggleClick = useCallback(() => {
    setExchangeAction(exchangeAction === "buy" ? "sell" : "buy")
  }, [exchangeAction])

  const handleFirstCurrencyChange = useCallback(
    (e) => {
      dispatch(ratesSlice.fetchRatesAsync(e.target.value))
    },
    [dispatch]
  )
  const handleSecondCurrencyChange = useCallback((e) => {
    setAltCurrency(e.target.value)
  }, [])

  const handlePopupClose = useCallback(() => {
    setBaseAmount(null)
    setAltAmount(null)
  }, [])

  const transaction = useMemo(
    () => ({
      from: exchangeAction === "sell" ? baseCurrency : altCurrency,
      to: exchangeAction === "sell" ? altCurrency : baseCurrency,
      amountFrom: (exchangeAction === "sell" ? baseAmount : altAmount) || 0,
      amountTo: (exchangeAction === "sell" ? altAmount : baseAmount) || 0,
    }),
    [exchangeAction, baseCurrency, altCurrency, baseAmount, altAmount]
  )

  return (
    <PhoneMockup>
      <x.div
        data-testid="exchange-page"
        display="flex"
        flexDirection="column"
        h="100%"
      >
        <ExhangeTitle currency={baseCurrency} action={exchangeAction} />
        <ExchangeRate currency={altCurrency} />

        <x.div
          flex="1 0 0"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pt="4"
        >
          <div>
            <ExchangeWidget
              currency={baseCurrency}
              omitCurrency={altCurrency}
              balance={baseBalance}
              prefix={exchangeAction === "sell" ? "–" : "+"}
              amount={baseAmount}
              onChangeAmount={handleFirstInputChange}
              onChangeCurrency={handleFirstCurrencyChange}
              error={baseAmountExceeds ? "exceeds balance" : null}
            />
            <ToggleActionButton
              action={exchangeAction}
              onClick={handleToggleClick}
            />
            <ExchangeWidget
              currency={altCurrency}
              omitCurrency={baseCurrency}
              balance={altBalance}
              prefix={exchangeAction === "buy" ? "–" : "+"}
              amount={altAmount}
              onChangeAmount={handleSecondInputChange}
              onChangeCurrency={handleSecondCurrencyChange}
              error={altAmountExceeds ? "exceeds balance" : null}
            />
          </div>
          <ExchangeTransaction
            action={exchangeAction}
            transaction={transaction}
            disabled={
              baseAmountExceeds ||
              altAmountExceeds ||
              baseAmount === null ||
              altAmount === null
            }
            onClose={handlePopupClose}
          />
        </x.div>
      </x.div>
    </PhoneMockup>
  )
}

type ExhangeTitleProps = { currency: CurrencyCode; action: ExchangeAction }
function ExhangeTitle({ currency, action }: ExhangeTitleProps) {
  return (
    <x.h2
      fontSize="3rem"
      fontWeight="medium"
      mb="2"
      lineHeight="1.35"
      data-testid="exchange-action"
    >
      {`${action === "sell" ? "Sell" : "Buy"} ${currency}`}
    </x.h2>
  )
}

export default ExchangePage
