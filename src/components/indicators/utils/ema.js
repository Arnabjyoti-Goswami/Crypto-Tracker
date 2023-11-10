const getEmaData = (priceData, period) => {
  const smoothing = 2;
  const alpha = smoothing / (period + 1);
  const emaData = [];
  emaData.push({
    date: priceData[0].date,
    ema: priceData[0].prices,
  });
  for (let i = 1; i < priceData.length; i++) {
    const price = priceData[i].prices;
    const emaPrev = emaData[i - 1].ema;
    const ema = alpha * price + (1 - alpha) * emaPrev;
    emaData.push({
      date: priceData[i].date,
      ema: ema,
    });
  }
  return emaData;
};

export default getEmaData;