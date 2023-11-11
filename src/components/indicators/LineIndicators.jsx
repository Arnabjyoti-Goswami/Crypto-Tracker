import { ResponsiveContainer, LineChart, Line, XAxis, YAxis,
Tooltip } from 'recharts';
import formatPrice from '../../utils/formatPrice.js';
import React from 'react';

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

const CustomTooltip = ( { payload, label, active, types, isPercent, currency = 'usd' } ) => {
  if (active) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan flex flex-col'>
          <span className='opacity-75'>
            Date: {label}
          </span>
          {
          types.map( (type, index) => (
            <span key={`Tooltip ${type}`}>
              {type}: {isPercent ? 
              Number(payload[index].value).toFixed(2) : 
              formatPrice(payload[index].value, currency)}
            </span>
          ) )
          }
        </p>
      </div>
    );
  }
}

const LineIndicators = ({ isPercent, currency, data, types }) => {
  console.log(data);
  return(
    <ResponsiveContainer height='35%'>
      <LineChart width={400} height={400} data={data}
      className='border border-gray-200'>
        {
        types.map( (type, index) => (
          <React.Fragment key={`LineGraph ${index}`}>
            <Line
            type='monotone'
            dataKey={type} 
            stroke={`${index === 0 ? '#BF55EC' : '#8884d8'}`} 
            strokeWidth='1px' 
            dot={<CustomizedDot />} 
            style={index===1 ? { strokeDasharray: '4 4' } : null}
            yAxisId={`YAxis ${index}`}
            />
            <YAxis
            yAxisId={`YAxis ${index}`} 
            dataKey={type} 
            hide domain={['auto', 'auto']} />
          </React.Fragment>
        ) )
        }
        <XAxis dataKey='date' hide />
        <Tooltip content={<CustomTooltip />} cursor={false} wrapperStyle={{outline: 'none'}}
        currency={currency} types={types} isPercent={isPercent} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineIndicators;
