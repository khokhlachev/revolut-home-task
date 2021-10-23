import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { walletSlice } from "@/entities/wallet"
import { ratesSlice } from "@/entities/rates"

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    rates: ratesSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
