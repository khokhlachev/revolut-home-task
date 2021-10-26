import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { ratesSlice } from "@/entities/rates"

export function useRatesPolling(
  currencyCode: CurrencyCode,
  interval: number = 10000
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const action = () => dispatch(ratesSlice.fetchRatesAsync(currencyCode))
    const startPolling = () =>
      setInterval(() => {
        promise = action()
      }, interval)
    const stopPolling = () => clearInterval(intervalId)

    let promise: ReturnType<typeof action> | undefined
    let intervalId = startPolling()

    const handleVisibilityChange = () =>
      document.hidden ? stopPolling() : (intervalId = startPolling())

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      stopPolling()
      promise?.abort()
    }
  }, [currencyCode, interval, dispatch])
}
