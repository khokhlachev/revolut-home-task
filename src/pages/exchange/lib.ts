import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { ratesSlice } from "@/entities/rates"

export function useRatesPolling(
  currencyCode: CurrencyCode,
  interval: number = 10000,
  limit: number = 50
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let count = 1

    const action = () => dispatch(ratesSlice.fetchRatesAsync(currencyCode))
    const startPolling = () =>
      setInterval(() => {
        if (count > limit) {
          clearInterval(intervalId)
          return
        }

        promise = action()
        count++
      }, interval)
    const stopPolling = () => clearInterval(intervalId)

    let promise: ReturnType<typeof action> | undefined
    let intervalId = startPolling()

    const handleVisibilityChange = () => {
      if (count > limit) {
        document.hidden ? stopPolling() : (intervalId = startPolling())
      } else {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      stopPolling()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      promise?.abort()
    }
  }, [currencyCode, interval, dispatch, limit])
}
