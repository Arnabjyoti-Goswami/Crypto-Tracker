import { createContext, useState, useLayoutEffect } from 'react';

export const StorageContext = createContext({});

export const StorageProvider = ({children}) => {
  const [allCoins, setAllCoins] = useState();
  
  const saveCoin = (coinId) => {
    let alreadySavedCoins = JSON.parse(localStorage.getItem('coins'));

    if(alreadySavedCoins.includes(coinId)) {
      return null;
    } else {
      let newAllCoins = [...alreadySavedCoins, coinId];
      setAllCoins(newAllCoins);
      localStorage.setItem('coins', JSON.stringify(newAllCoins));
    }
  }

  useLayoutEffect(() => {
    let isPresent = JSON.parse(localStorage.getItem('coins')) || false;
    if(!isPresent) {
      localStorage.setItem('coins', JSON.stringify([]));
    } else {
      let totalCoins = JSON.parse(localStorage.getItem('coins'));
      setAllCoins(totalCoins);
    }
  }, []);

  return (
    <StorageContext.Provider 
    value={ { 
      allCoins,
      saveCoin,
    } }>
      {children}
    </StorageContext.Provider>
  )
}