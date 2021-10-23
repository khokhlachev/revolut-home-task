import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { ratesSlice } from "@/entities/rates"

export function useRatesPolling(currencyCode: CurrencyCode) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const action = () => dispatch(ratesSlice.fetchRatesAsync(currencyCode))
    let promise: ReturnType<typeof action>

    const interval = setInterval(() => {
      // promise = action()
    }, 100 * 1000)

    promise = action()

    return () => {
      clearInterval(interval)
      promise.abort()
    }
  }, [currencyCode, dispatch])
}
