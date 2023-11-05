import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,
Tooltip, CartesianGrid  } from 'recharts';
import formatPrice from '../utils/formatPrice.js';

const CustomizedDot = ({ cx, cy, stroke, payload, value }) => {
  if (payload.visible) {
    return (
      <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="white">
        <g transform="translate(4 4)">
          <circle r="4" fill="black" />
          <circle r="2" fill="white" />
        </g>
      </svg>
    );
  }
};


const CustomTooltip = ( { payload, label, active, currency = 'usd' } ) => {
  if(active) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan'>
          <div className='flex flex-col'>
            <span className='opacity-75'>
              {label}
            </span>
            <span>
              {formatPrice(payload[0].value, currency)}
            </span>
          </div>
        </p>
      </div>
    );
  }
}

const LineRecharts = ({data, currency, type}) => {
  return(
    <ResponsiveContainer height='90%'>
      <LineChart width={400} height={400} data={data}>
        <Line type='monotone' dataKey={type} stroke='#14ffec' strokeWidth='1px' dot={<CustomizedDot />} />
        <CartesianGrid stroke='#323232' />
        <XAxis dataKey='date' hide />
        <YAxis dataKey={type} hide domain={['auto', 'auto']}/>
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{outline: 'none'}} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineRecharts;