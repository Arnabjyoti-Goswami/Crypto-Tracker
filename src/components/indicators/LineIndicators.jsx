import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,
Tooltip } from 'recharts';
import formatPrice from '../../utils/formatPrice.js';

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

const CustomTooltip = ( { payload, label, active, type, isPercent, currency = 'usd' } ) => {
  if(active) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan'>
          <div className='flex flex-col'>
            <span className='opacity-75'>
              Date: {label}
            </span>
            {
              isPercent ? (
              <span>
                {type}: {Number(payload[0].value).toFixed(2)}
              </span>
              ) : 
              <span>
                {type}: {formatPrice(payload[0].value, currency)}
              </span>
            }
          </div>
        </p>
      </div>
    );
  }
}

const LineIndicators = ({data, currency, type, isPercent}) => {
  return(
    <ResponsiveContainer height='35%'>
      <LineChart width={400} height={400} data={data}
      className='border border-gray-200'>
        <Line type='monotone' dataKey={type} stroke='#BF55EC' strokeWidth='1px' dot={<CustomizedDot />} />
        <XAxis dataKey='date' hide />
        <YAxis dataKey={type} hide domain={['auto', 'auto']}/>
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{outline: 'none'}} type={type} isPercent={isPercent} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineIndicators;
