import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { ratesSlice } from "@/entities/rates"

export function useRatesPolling(currencyCode: CurrencyCode) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const action = () => dispatch(ratesSlice.fetchRatesAsync(currencyCode))
    let promise: ReturnType<typeof action>
    let interval: ReturnType<typeof setInterval>

    function handleVisibilityChange() {
      if (document.hidden) {
        clearInterval(interval)
      } else {
        interval = setInterval(() => {
          promise = action()
        }, 10 * 1000)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    promise = action()

    return () => {
      clearInterval(interval)
      promise.abort()
    }
  }, [currencyCode, dispatch])
}
