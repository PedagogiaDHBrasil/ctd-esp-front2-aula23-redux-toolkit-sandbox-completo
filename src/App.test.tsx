import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

jest.mock("./features/btcPrice/BtcPrice", () => {
  return {
    BtcPrice: () => {
      return <div>BtcPrice</div>;
    },
  };
});

test("renders correctly", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Precio del BTC/i)).toBeInTheDocument();
  expect(screen.getByText(/BtcPrice/i)).toBeInTheDocument();
  expect(screen.getAllByAltText(/logo/i)).toHaveLength(1);
  expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
  expect(screen.getByText(/CoinDesk/i)).toBeInTheDocument();
});
