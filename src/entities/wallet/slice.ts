import { RootState } from "@/app/store"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BALANCES } from "./config"
import { commitTransaction } from "@/shared/api"
import { TransactionProps } from "./types"

export interface UserState {
  balances: { [k in CurrencyCode]: number }
}

const initialState: UserState = {
  balances: BALANCES,
}

export const commitTransactionAsync = createAsyncThunk(
  "wallet/commitTransaction",
  async (data: TransactionProps) => {
    const response = await commitTransaction(data)
    return response
  }
)

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      commitTransactionAsync.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          from: CurrencyCode
          to: CurrencyCode
          amountFrom: number
          amountTo: number
        }>
      ) => {
        const { from, to, amountFrom, amountTo } = payload

        state.balances[from] -= amountFrom
        state.balances[to] += amountTo
      }
    )
  },
})

export const selectBalanceByCode = (state: RootState, code: CurrencyCode) =>
  state.wallet.balances[code]

export const reducer = walletSlice.reducer
