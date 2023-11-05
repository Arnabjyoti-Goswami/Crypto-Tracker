import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import formatPrice from '../utils/formatPrice.js';
import { useContext, useState } from 'react';
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

  const [focusBar, setFocusBar] = useState(null);

  const getColorArray = (opacity) => {
    const colorArray = data.map((item, index) => {
      const initialCondition = true;
      if (index === 0) {
        return initialCondition ? `rgba(37, 218, 114, ${opacity})` : `rgba(214, 67, 110, ${opacity})`;
      } else {
        const previousItem = data[index - 1];
        return item.total_volumes > previousItem.total_volumes ? `rgba(37, 218, 114, ${opacity})` : `rgba(214, 67, 110, ${opacity})`;
      }
    });
    return colorArray;
  }

  return (
    <ResponsiveContainer height='30%'>
      <BarChart width={400} height={400} data={data} 
      className='border border-gray-200'
      onMouseMove={(state) => {
        if (state.isTooltipActive) {
          setFocusBar(state.activeTooltipIndex);
        } else {
          setFocusBar(null);
        }
     }}>
        <Bar dataKey='total_volumes'>
          {
          data.map( (entry, index) => (
            <Cell key={`cell-${index}`} fill={
              focusBar === index ? getColorArray(1)[index % 20] : getColorArray(0.7)[index % 20]
            } className='bg-opacity-25'/>
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