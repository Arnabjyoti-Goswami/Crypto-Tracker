import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const LineRecharts = ({data}) => {
  return(
    <ResponsiveContainer height='90%'>
      <LineChart width={400} height={400} data={data}>
        <Line type='monotone' dataKey='prices' stroke='#14ffec' strokeWidth={'1px'} />
        <CartesianGrid stroke='#323232' />
        <XAxis datakey='date' hide />
        <YAxis datkey='prices' hide domain={['auto', 'auto']}/>
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineRecharts;