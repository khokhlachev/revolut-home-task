type FetchRatesResponse = {
  base_code: CurrencyCode
  conversion_rates: { [k in CurrencyCode]: number }
}

export async function fetchRates(
  currencyCode: CurrencyCode
): Promise<FetchRatesResponse> {
  const response = await fetch(
    `https://revolut-home-task.khokhlachev.com/api/rates?base=${currencyCode}`
  )
  return response.json()
}

export function commitTransaction<T>(data: T) {
  return new Promise<T>((resolve) =>
    setTimeout(() => {
      resolve(data)
    }, 1500)
  )
}
