import { useContext } from 'react';
import { CryptoContext } from '../../context/CryptoContext.jsx';
import selectIcon from '../../assets/select-icon.svg';

import RSI from './RSI.jsx';
import OBV from './OBV.jsx';
import MACD from './MACD.jsx';

const indicatorOptions = [
  { label: 'rsi', component: RSI },
  { label: 'obv', component: OBV },
  { label: 'macd', component: MACD },
];

const IndicatorSelector = () => {
  const { indicatorType, setIndicatorType } = useContext(CryptoContext);

  const handleIndicatorChange = (e) => {
    e.preventDefault();
    let val = e.target.value;
    e.target.placeholder = val;
    setIndicatorType(val);
  }

  return (
    <label className='relative flex justify-center items-center
    text-sm'>
      <span className='text-gray-100 mr-2 ml-4'>
        indicator:
      </span>
      <select name='indicatorType'
      className='rounded bg-gray-200 pl-2 pr-10 py-0.5 leading-4
      focus:outline-0 
      text-gray-50 uppercase text-center'
      value={indicatorType}
      onChange={handleIndicatorChange}
      >
        {
        indicatorOptions.map( (option, index) => (
          <option value={option.label} key={`option ${index}`}>
            {option.label}
          </option>
        ) )
        }
      </select>
      <img src={selectIcon} alt='sort' 
      className='w-[1rem] h-auto absolute right-1 top-1 pointer-events-none'/>
    </label>
  )
}

const IndicatorGraph = ({ priceData, volumeData, currency, period=14 }) => {
  const { indicatorType } = useContext(CryptoContext);
  const graphProps = { priceData, volumeData, currency, period }
  let matchingOption = indicatorOptions.find(option => option.label === indicatorType);
  if (!matchingOption) {
    console.error(`No matching option found for indicator type: ${indicatorType}`);
    return null;
  }
  const IndicatorGraphComponent = matchingOption.component;

  return (
    <IndicatorGraphComponent {...graphProps} />
  );
}

export { IndicatorSelector, IndicatorGraph };