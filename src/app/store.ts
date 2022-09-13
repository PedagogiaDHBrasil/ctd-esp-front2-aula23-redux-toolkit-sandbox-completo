import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import btcPriceReducer from "../features/btcPrice/btcPriceSlice";

export const store = configureStore({
  reducer: {
    btcPrice: btcPriceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
