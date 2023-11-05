import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,
Tooltip, CartesianGrid, Legend,  } from 'recharts';
import formatPrice from '../utils/formatPrice.js';

const CustomTooltip = ( { payload, label, active, currency = 'usd' } ) => {
  if(active) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan'>
          <span className='opacity-75'>
            {label} :{' '}
          </span>
          <span>
            {formatPrice(payload[0].value, currency)}
          </span>
        </p>
      </div>
    );
  }
}

const LineRecharts = ({data, currency}) => {
  return(
    <ResponsiveContainer height='90%'>
      <LineChart width={400} height={400} data={data}>
        <Line type='monotone' dataKey='prices' stroke='#14ffec' strokeWidth='1px' />
        <CartesianGrid stroke='#323232' />
        <XAxis dataKey='date' hide />
        <YAxis dataKey='prices' hide domain={['auto', 'auto']}/>
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{outline: 'none'}} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineRecharts;