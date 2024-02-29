import { createContext, useState, useEffect } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState();

  const getTrendingData = async () => {
    setTrendingData();
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      const data = await res.json();
      console.log("Trending Page data", data);
      setTrendingData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTrendingPage = () => {
    getTrendingData();
  };

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendingData,
        resetTrendingPage,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
