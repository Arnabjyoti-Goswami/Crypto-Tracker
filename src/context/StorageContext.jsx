import { createContext, useState, useLayoutEffect } from 'react';

export const StorageContext = createContext({});

export const StorageProvider = ({children}) => {
  const [allCoins, setAllCoins] = useState();
  
  const saveCoin = (coinId) => {
    let alreadySavedCoins = JSON.parse(localStorage.getItem('coins'));
    let newAllCoins = [...alreadySavedCoins, coinId];
    setAllCoins(newAllCoins);
    localStorage.setItem('coins', JSON.stringify(newAllCoins));
  }
  
  const removeCoin = (coinId) => {
    let alreadySavedCoins = JSON.parse(localStorage.getItem('coins'));
    let newAllCoins = alreadySavedCoins.filter(coin => coin !== coinId);
    setAllCoins(newAllCoins);
    localStorage.setItem('coins', JSON.stringify(newAllCoins));
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
      removeCoin
    } }>
      {children}
    </StorageContext.Provider>
  )
}