import React from "react";
import logo from "./bitcoin.png";
import { BtcPrice } from "./features/btcPrice/BtcPrice";
import "./App.css";

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <h1>Preço do BTC</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <BtcPrice />
        <p>
          Powered by {""}
          <a
            href="https://old.coindesk.com/price/bitcoin"
            target="_blank"
            rel="noreferrer"
          >
            CoinDesk
          </a>
        </p>
      </main>
    </div>
  );
}

export default App;
