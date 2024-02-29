import { createContext, useState, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendingData, setTrendingData] = useState();

  const { showBoundary } = useErrorBoundary();

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
      showBoundary(error);
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
