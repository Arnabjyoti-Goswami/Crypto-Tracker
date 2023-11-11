import { createContext, useState, useLayoutEffect } from 'react';

export const TrendingContext = createContext({});

export const TrendingProvider = ({children}) => {
  const [trendingData, setTrendingData] = useState();

  const getTrendingData = async () => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`).then(res => res.json()).then(json => json);
      console.log('Trending Page data', data);
      setTrendingData(data.coins);
    } catch(error) {
      console.log(error);
    }
  }

  const resetTrendingPage = () => {
    getTrendingData();
  }

  useLayoutEffect(() => {
    getTrendingData();
  }, []);

  return (
    <TrendingContext.Provider 
    value={ { 
      trendingData, 
      resetTrendingPage,
    } }>
      {children}
    </TrendingContext.Provider>
  )
}