const rollingAverage = (arr, period) => {
  const result = [];
  // Take as much data as available for the first few data points in the array to calculate the average
  let sum = arr[0];
  result.push(sum);
  for (let i = 1; i < period; i++) {
    sum += arr[i];
    result.push(sum / (i + 1));
  }
  // Implement the rolling average logic for the given period
  for (let i = period; i < arr.length; i++) {
    let rollingSum = 0;
    for (let j = i - period; j < i; j++) {
      rollingSum += arr[j];
    }
    result.push(rollingSum / period);
  }
  return result;
};

export default rollingAverage;