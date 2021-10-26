type FetchRatesResponse = {
  base_code: CurrencyCode
  conversion_rates: { [k in CurrencyCode]: number }
}

const API_URL = `https://revolut-home-task.khokhlachev.com/api`
export async function fetchRates(
  currencyCode: CurrencyCode
): Promise<FetchRatesResponse> {
  const response = await fetch(`${API_URL}/rates/?base=${currencyCode}`)
  return response.json()
}

export async function commitTransaction<T>(data: T) {
  const response = await fetch(`${API_URL}/transaction`, {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response.json()
}
