import { createContext, useState, useLayoutEffect } from 'react'

export const CryptoContext = createContext({});

export const CryptoProvider = ({children}) => {
  const [ cryptoData, setCryptoData ] = useState();

  const getCryptoData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full`).then(res => res.json()).then(json => json);
      console.log(data);
      setCryptoData(data);
    } catch(error) {
      console.log(error);
    }
  }

  
  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  const [searchResultData, setSearchResultData] = useState();

  const getSearchResult = async (query) => {
    try {
      const searchResultData = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json);
      console.log(searchResultData);
      setSearchResultData(searchResultData);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <CryptoContext.Provider value={{ cryptoData, searchResultData, getSearchResult }}>
      {children}
    </CryptoContext.Provider>
  )
};