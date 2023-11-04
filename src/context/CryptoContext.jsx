import { createContext, useState, useLayoutEffect } from 'react'

export const CryptoContext = createContext({});

export const CryptoProvider = ({children}) => {
  const [cryptoData, setCryptoData] = useState();
  const [totalCoins, setTotalCoins] = useState(100);
  
  const [coinSearch, setCoinSearch] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(10);

  const resetHomePage = () => {
    setCurrentPage(1);
    setCoinSearch('');
    setSortBy('market_cap_desc');
    setCurrency('usd');
    setCoinsPerPage(10);
  }

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then(res => res.json()).then(json => json);
      console.log(data.length);
      setTotalCoins(data.length);
    } catch(error) {
      console.log(error);
    }

    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`).then(res => res.json()).then(json => json);
      console.log(data);
      setCryptoData(data);
    } catch(error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, currentPage, coinsPerPage]);

  const [searchResultData, setSearchResultData] = useState();

  const getSearchResult = async (query) => {
    try {
      const searchResultData = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json);
      console.log(searchResultData);
      setSearchResultData(searchResultData.coins);
    } catch(error) {
      console.log(error);
    }
  }

  const [coinData, setCoinData] = useState();

  const getCoinData = async (coinId) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`).then(res => res.json()).then(json => json);
      console.log(data);
      setCoinData(data);
    } catch(error) {
      console.log(error);
    }
  }
  
  return (
    <CryptoContext.Provider 
    value={ { 
      cryptoData, 
      searchResultData, 
      getSearchResult, 
      setCoinSearch, 
      setSearchResultData, 
      currency, setCurrency, 
      sortBy, setSortBy,
      currentPage, setCurrentPage,
      totalCoins,
      resetHomePage,
      coinsPerPage, setCoinsPerPage,
      coinData,
      getCoinData,
    } }>
      {children}
    </CryptoContext.Provider>
  )
}