import { API_URL } from "../../constants";

export const getBtcPrice = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const btcPrice = data.bpi.USD.rate;
    const date = data.time.updated;
    return { btcPrice, date };
  } catch (err: any) {
    throw new Error(err);
  }
};
