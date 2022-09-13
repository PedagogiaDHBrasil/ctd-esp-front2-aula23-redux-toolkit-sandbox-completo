import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getBtcPrice } from "./btcPriceAPI";

export interface BtcPricestate {
  value: {
    btcPrice: number;
    date: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: BtcPricestate = {
  value: {
    btcPrice: 0,
    date: "",
  },
  status: "idle",
};

export const getCurentBtcPrice = createAsyncThunk(
  "btcPrice/getCurentBtcPrice",
  async () => {
    const response = await getBtcPrice();
    return response;
  }
);

export const btcPriceSlice = createSlice({
  name: "btcPrice",
  initialState,
  reducers: {
    clear() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurentBtcPrice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurentBtcPrice.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getCurentBtcPrice.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clear } = btcPriceSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getBtcPriceFromState = (state: RootState) => state.btcPrice.value;
export const getStatusFromState = (state: RootState) => state.btcPrice.status;

export default btcPriceSlice.reducer;
