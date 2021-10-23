import { RootState } from "@/app/store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchRates } from "@/shared/api"

export interface RatesState {
  status: "idle" | "loading" | "failed"
  currencyCode: CurrencyCode
  exchangeRates: { readonly [k in CurrencyCode]: number }
  meta: {
    prevCurrencyCode: CurrencyCode | null
  }
}

const initialState: RatesState = {
  status: "idle",
  currencyCode: "GBP",
  exchangeRates: null!,
  meta: {
    prevCurrencyCode: null,
  },
}

export const fetchRatesAsync = createAsyncThunk(
  "rates/fetch",
  async (currencyCode: CurrencyCode) => {
    const json = await fetchRates(currencyCode)
    return json
  }
)

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatesAsync.pending, (state, { meta }) => {
        state.status = "loading"
        state.meta.prevCurrencyCode = state.currencyCode
        state.currencyCode = meta.arg
      })
      .addCase(fetchRatesAsync.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.exchangeRates = payload.conversion_rates
        state.currencyCode = payload.base_code
      })
      .addCase(fetchRatesAsync.rejected, (state) => {
        state.currencyCode = state.meta.prevCurrencyCode!
        state.meta.prevCurrencyCode = null
        state.status = "failed"
      })
  },
})

export const selectCurrencyCode = (state: RootState) => state.rates.currencyCode
export const selectRateByCode = (state: RootState, code: CurrencyCode) =>
  state.rates.exchangeRates?.[code]

export const reducer = ratesSlice.reducer
