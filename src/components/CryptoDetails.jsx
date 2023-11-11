import { useContext, useLayoutEffect, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext.jsx';
import { SelectIcon, GithubLogo, FacebookLogo, RedditLogo, TwitterLogo } from '../assets/';
import Chart from './Chart.jsx';
import formatPrice from '../utils/formatPrice.js';
import Loading from './Loading.jsx';

const HighLowIndicator = ({currentPrice, high, low}) => {
  const [green, setGreen] = useState();

  useEffect( () => {
    let total = high - low;
    let greenZone = ((high - currentPrice)*100)/total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low] )

  return(
    <>
      <span className='bg-red h-1.5 rounded-l-lg w-[50%]'
      style={{ width: `${100 - green}%` }} >
        &nbsp;
      </span>
      <span className='bg-green h-1.5 rounded-r-lg w-[50%]'
      style={{ width: `${green}%` }} >
        &nbsp;
      </span>
    </>
  )
}

const CryptoDetails = () => {
  let { coinId } = useParams();
  let { getCoinData, coinData:data, currency } = useContext(CryptoContext);
  let navigate = useNavigate();

  const closePopUp = () => {
    navigate('..');
  }

  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId])

  const getCoinRankings = (data) => [
    { label: 'market cap rank: ', data: data.market_cap_rank },
    { label: 'coinGecko rank: ', data: data.coingecko_rank },
    { label: 'coinGecko score: ', data: Number(data.coingecko_score).toFixed(2) },
  ];

  const getSupply = (data) => [
    {
      label: 'max supply', 
      data: new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      }).format(data.market_data.max_supply),
    },
    { 
      label: 'circulating supply',
      data: new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      }).format(data.market_data.circulating_supply),
    },
  ];

  const getLinks = (data) => [
    {
      label: data.links.homepage[0].substring(0,30),
      data: data.links.homepage[0],
    },
    {
      label: data.links.blockchain_site[0].substring(0,30),
      data: data.links.blockchain_site[0],
    },
    {
      label: data.links.official_forum_url[0].substring(0,30),
      data: data.links.official_forum_url[0],
    },
  ];

  const getSocials = (data) => [
    { 
      icon: GithubLogo, 
      link: data.links.repos_url.github[0],
    },
    { 
      icon: TwitterLogo, 
      link: `https://twitter.com/${data.links.twitter_screen_name}`,
    },
    { 
      icon: RedditLogo, 
      link: data.links.subreddit_url,
    },
    { 
      icon: FacebookLogo, 
      link: `https://facebook.com/${data.links.facebook_username}`,
    },
  ];

  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full
    bg-gray-200 bg-opacity-30 backdrop-blur-sm
    flex items-center justify-center font-nunito'
    onClick={closePopUp}>
      <div className='w-[65%] h-[75%] relative rounded-lg
      bg-gray-300 bg-opacity-75 text-white'
      onClick={ (e) => {
        e.stopPropagation()
      } }>
      {
        data
        ? (
        <div className='flex items-center justify-between h-full w-full p-4'>
          <div className='flex flex-col w-[45%] h-full pr-2'>
            <div className='flex w-full items-center'>
              <img src={data.image.large} alt={data.id} 
              className='w-[3rem] h-[3rem] mx-1.5'/>
              <h1 className='text-xl capitalize font-medium'>
                {data.name}
              </h1>
              <span className='text-sm py-0.5 px-2.5 ml-2
              text-cyan bg-cyan bg-opacity-25
              rounded uppercase'>
                {data.symbol}
              </span>
            </div>
            <div className='flex w-full mt-6'>
              <div className='flex flex-col w-full'>
                <div className='flex justify-between'>
                  <span className='text-sm capitalize text-gray-100'>
                    Price
                  </span>
                  <div className={`text-sm px-1 ml-2 font-medium
                  flex items-center rounded uppercase
                  bg-opacity-25
                  ${
                    data.market_data.price_change_percentage_24h > 0 
                    ? 'bg-green text-green' : 
                    'bg-red text-red'
                  } 
                  `}>
                    <span>
                      {Number(data.market_data.price_change_percentage_24h).toFixed(2)}%
                    </span>
                    <SelectIcon upTrend={
                      data.market_data.price_change_percentage_24h > 0
                    }/>
                  </div>
                </div>
                <h2 className='text-lg font-bold'>
                {
                  formatPrice(data.market_data.current_price[currency], currency)
                }
                </h2>
              </div>
            </div>
            <div className='flex w-full mt-4 justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  Market Cap
                </span>
                <h2 className='text-base font-bold'>
                {  
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                  maximumFractionDigits: 2,minimumFractionDigits: 0,
                }).format(data.market_data.market_cap[currency])
                }
                </h2>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  fully diluted valuation
                </span>
                <h2 className='text-base font-bold ml-auto'>
                {  
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: currency,
                  notation: 'compact',
                }).format(data.market_data.fully_diluted_valuation[currency])
                }
                </h2>
              </div>
            </div>
            <div className='flex flex-col w-full mt-4 justify-between'>
              <span className='text-sm capitalize text-gray-100'>
                total volume
              </span>
              <h2 className='text-base font-bold'>
              {  
              new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              }).format(data.market_data.total_volume[currency])
              }
              </h2>
            </div>
            <div className='w-full mt-4 flex justify-between'>
              <HighLowIndicator 
              currentPrice={data.market_data.current_price[currency]}
              high={data.market_data.high_24h[currency]}
              low={data.market_data.low_24h[currency]}
              />
            </div>
            <div className='flex w-full mt-4 justify-between'>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  low 24H
                </span>
                <h2 className='text-base font-bold'>
                {
                  formatPrice(data.market_data.low_24h[currency], currency)
                }
                </h2>
              </div>
              <div className='flex flex-col'>
                <span className='text-sm capitalize text-gray-100'>
                  high 24H
                </span>
                <h2 className='text-base font-bold'>
                {
                  formatPrice(data.market_data.high_24h[currency], currency)
                }
                </h2>
              </div>
            </div>
            <div className='flex w-full mt-4 justify-between'>
            {
            getSupply(data).map( (item, index) => (
              <div className='flex flex-col'
              key={`supply data ${index}`}>
                <span className='text-sm capitalize text-gray-100'>
                  {item.label}
                </span>
                <h2 className='text-base font-bold ml-auto'>
                  {item.data}
                </h2>
              </div>
            ) )
            }
            </div>
            <div className='flex w-full mt-auto justify-between'>
              <div className='flex flex-col'>
              {
              getLinks(data).map( (item, index) => (
                  item.data ? (
                  <a className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded' 
                  href={item.data}
                  key={`link #${index}`}
                  rel='noreferrer' 
                  target='_blank'>
                    {item.label}
                  </a> 
                  ) : null
              ) )
              }
              </div>
              <div className='flex flex-col content-start'>
                <span className='text-sm capitalize text-gray-100'>
                  sentiment
                </span>
                <div className='flex justify-between'>
                  <div className='text-sm px-1 my-1 font-medium
                  flex items-center rounded uppercase
                  bg-opacity-25
                bg-green text-green'
                  >
                    <span>
                      {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                    </span>
                    <SelectIcon upTrend={
                      true
                    }/>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-sm px-1 my-1  font-medium
                  flex items-center rounded uppercase
                  bg-opacity-25
                bg-red text-red'
                  >
                    <span>
                      {Number(data.sentiment_votes_down_percentage).toFixed(2)}%
                    </span>
                    <SelectIcon upTrend={
                      false
                    }/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-[55%] h-full pl-3 justify-stretch'>
            <Chart id={data.id} />
            <div className='flex flex-col'>
            {
            getCoinRankings(data).map( (item, index) => (
              <h3 key={`ranking details #${index}`}
              className='text-white py-1'>
                <span className='text-gray-100 capitalize mr-1'>
                  {item.label}
                </span>
                {item.data}
              </h3>
            ) )
            }
            </div>
          </div>
          <div className='absolute bottom-8 right-8 flex items-center'>
          {
          getSocials(data).map( (item, index) => (
            item.link ? (
            <a target='blank' rel='noreferrer'
            key={`social link #${index}`}
            href={item.link}
            className='text-lg px-1'>
              <item.icon fillColor='cyan'/>
            </a>
            ) : null
          ) )
          }
          </div>
        </div>
        ) :
        <Loading />
      }
      </div>
    </div> ,
    document.getElementById("model")
  )
}

export default CryptoDetails;