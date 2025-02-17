import { createContext, useState, useEffect, useContext } from "react";
import { CryptoContext } from "./";
import { useErrorBoundary } from "react-error-boundary";

export const StorageContext = createContext({});

export const StorageProvider = ({ children }) => {
  let { currency, sortBy } = useContext(CryptoContext);

  const [allCoins, setAllCoins] = useState();
  const [savedCoinsData, setSavedCoinsData] = useState();

  const { showBoundary } = useErrorBoundary();

  const saveCoin = (coinId) => {
    let alreadySavedCoins = JSON.parse(localStorage.getItem("coins"));
    let newAllCoins = [...alreadySavedCoins, coinId];
    setAllCoins(newAllCoins);
    localStorage.setItem("coins", JSON.stringify(newAllCoins));
  };

  const removeCoin = (coinId) => {
    let alreadySavedCoins = JSON.parse(localStorage.getItem("coins"));
    let newAllCoins = alreadySavedCoins.filter((coin) => coin !== coinId);
    setAllCoins(newAllCoins);
    localStorage.setItem("coins", JSON.stringify(newAllCoins));
  };

  const getSavedCoinsData = async (totalCoins = allCoins) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`
      );
      const data = await res.json();
      console.log("Saved Coins' data", data);
      setSavedCoinsData(data);
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    let isPresent = JSON.parse(localStorage.getItem("coins")) || false;
    if (!isPresent) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);
      if (totalCoins.length > 0) {
        getSavedCoinsData(totalCoins);
      }
    }
  }, []);

  useEffect(() => {
    if (allCoins?.length > 0) {
      getSavedCoinsData(allCoins);
    } else {
      setSavedCoinsData();
    }
  }, [allCoins]);

  return (
    <StorageContext.Provider
      value={{
        allCoins,
        saveCoin,
        removeCoin,
        savedCoinsData,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
