import { createContext, useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [totalCoins, setTotalCoins] = useState(100);

  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);

  const { showBoundary } = useErrorBoundary();

  const resetHomePage = () => {
    setCurrentPage(1);
    setCoinSearch("");
    setSortBy("market_cap_desc");
    setCurrency("usd");
    setCoinsPerPage(10);
  };

  const getCryptoData = async () => {
    setCryptoData();

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
      const data = await res.json();
      console.log(data.length);
      setTotalCoins(data.length);
    } catch (error) {
      showBoundary(error);
    }

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`
      );
      const data = await res.json();
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, currentPage, coinsPerPage]);

  const [searchResultData, setSearchResultData] = useState();

  const getSearchResult = async (query) => {
    setSearchResultData();
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const searchResultData = await res.json();
      console.log(searchResultData);
      setSearchResultData(searchResultData.coins);
    } catch (error) {
      showBoundary(error);
    }
  };

  const [coinData, setCoinData] = useState();

  const getCoinData = async (coinId) => {
    setCoinData();
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      );
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to fetch");
      }
      if ("error" in data && data.error == "coin not found") {
        throw new Error("Coin not found. Please search for a valid coin.");
      }
      console.log(data);
      setCoinData(data);
    } catch (error) {
      showBoundary(error);
    }
  };

  const [indicatorType, setIndicatorType] = useState("obv");

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchResultData,
        getSearchResult,
        setCoinSearch,
        setSearchResultData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        totalCoins,
        resetHomePage,
        coinsPerPage,
        setCoinsPerPage,
        coinData,
        getCoinData,
        indicatorType,
        setIndicatorType,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
