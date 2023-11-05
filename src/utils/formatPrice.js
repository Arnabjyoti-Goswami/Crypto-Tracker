const formatPrice = (price, currency) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: price < 1
    ? 6
    : price >= 1 && price < 10
      ? 5
      : price >= 10 && price < 100
        ? 4
        : price >= 100 && price < 1000
          ? 3
          : 2
  }).format(price);
}

export default formatPrice;