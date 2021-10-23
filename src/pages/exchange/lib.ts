import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { ratesSlice } from "@/entities/rates"

export function useRatesPolling(currencyCode: CurrencyCode) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const action = () => dispatch(ratesSlice.fetchRatesAsync(currencyCode))
    const startPolling = () =>
      setInterval(() => {
        promise = action()
      }, 10 * 1000)
    const stopPolling = () => clearInterval(interval)

    let promise = action()
    let interval = startPolling()

    const handleVisibilityChange = () =>
      document.hidden ? stopPolling() : (interval = startPolling())

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      stopPolling()
      promise.abort()
    }
  }, [currencyCode, dispatch])
}
