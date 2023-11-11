const getFractionDigits = (price, digitsToDisplay) => {
  let fractionDigits = digitsToDisplay;

  while (price >= 10 && fractionDigits > 2) {
    price /= 10;
    fractionDigits--;
  }

  return fractionDigits;
};

const formatPrice = (price, currency, digitsToDisplay=6) => {
  const numFractionDigits = getFractionDigits(price, digitsToDisplay);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: numFractionDigits,
  }).format(price);
}

export default formatPrice;