import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import formatPrice from '../utils/formatPrice.js';
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext.jsx';

const CustomTooltip = ( { payload, label, active, currency = 'usd' } ) => {
  if(active) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan'>
          <div className='flex flex-col border border-gray-300 border-opacity-70'>
            <span className='opacity-75'>
              Date: {label}
            </span>
            <span>
              Volume: {formatPrice(payload[0].value, currency)}
            </span>
          </div>
        </p>
      </div>
    );
  }
}

const BarRecharts = ({data}) => {
  let { currency } = useContext(CryptoContext);

  const colorArray = data.map((item, index) => {
    const opacity = 0.7;
    const initialCondition = true;
    if (index === 0) {
      return initialCondition ? `rgba(37, 218, 114, ${opacity})` : `rgba(214, 67, 110, ${opacity})`;
    } else {
      const previousItem = data[index - 1];
      return item.total_volumes > previousItem.total_volumes ? `rgba(37, 218, 114, ${opacity})` : `rgba(214, 67, 110, ${opacity})`;
    }
  });

  return (
    <ResponsiveContainer height='30%'>
      <BarChart width={400} height={400} data={data} 
      className='border border-gray-200'>
        <Bar dataKey='total_volumes'>
          {
          data.map( (entry, index) => (
            <Cell key={`cell-${index}`} fill={colorArray[index % 20]} className='bg-opacity-25'/>
          ) )
          }
        </Bar>
        <XAxis dataKey='date' hide />
        <YAxis dataKey='total_volumes' hide domain={['auto', 'auto']}/>
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{outline: 'none'}} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarRecharts;