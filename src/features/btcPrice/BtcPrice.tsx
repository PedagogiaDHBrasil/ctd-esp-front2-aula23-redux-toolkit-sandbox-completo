import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  clear,
  getBtcPriceFromState,
  getCurentBtcPrice,
  getStatusFromState,
} from "./btcPriceSlice";
import styles from "./btcPrice.module.css";

export function BtcPrice() {
  const status = useAppSelector(getStatusFromState);
  const btcPrice = useAppSelector(getBtcPriceFromState);
  const dispatch = useAppDispatch();

  if (status === "failed") {
    return (
      <div className={styles.error}>
        Ocorreu um erro ao obter as informações
      </div>
    );
  }

  return (
    <div>
      <div className={styles.row}>
        {status === "loading" ? (
          <div className={styles.loading}>
            <div>Carregando...</div>
          </div>
        ) : (
          <div className={styles.priceDetails}>
            <span>USD {btcPrice.btcPrice}</span>
            <span>{btcPrice.date}</span>
          </div>
        )}
        <button
          className={styles.button}
          aria-label="Obter preço"
          onClick={() => dispatch(getCurentBtcPrice())}
        >
          Obter preço
        </button>
        <button
          className={styles.button}
          aria-label="Apagar"
          onClick={() => dispatch(clear())}
        >
          Apagar dados
        </button>
      </div>
    </div>
  );
}
