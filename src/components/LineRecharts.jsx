import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,
Tooltip, CartesianGrid, Legend,  } from 'recharts';
import formatPrice from '../utils/formatPrice.js';

const CustomTooltip = ( { payload, label, active, currency = 'usd' } ) => {
  if(active) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>
          {`
          ${label} : 
          ${
            formatPrice(payload[0].value, currency)
          }
          `}
        </p>
      </div>
    );
  }
}


const LineRecharts = ({data}) => {
  return(
    <ResponsiveContainer height='90%'>
      <LineChart width={400} height={400} data={data}>
        <Line type='monotone' dataKey='prices' stroke='#14ffec' strokeWidth={'1px'} />
        <CartesianGrid stroke='#323232' />
        <XAxis dataKey='date' hide />
        <YAxis dataKey='prices' hide domain={['auto', 'auto']}/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineRecharts;