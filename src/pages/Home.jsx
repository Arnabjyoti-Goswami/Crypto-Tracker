import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import Navigation from '../components/Navigation.jsx';
import { CryptoProvider } from '../context/CryptoContext.jsx';
import { TrendingProvider } from '../context/TrendingContext.jsx';

const Home = () => {
  return (
    <CryptoProvider>
    <TrendingProvider>
      <main className='w-full h-full flex flex-col content-center items-center relative text-white font-nunito'>
      <div className='w-screen h-screen bg-gray-300 fixed -z-10' />
        <Logo />
        <Navigation />
        <Outlet />
      </main>
    </TrendingProvider>
    </CryptoProvider>
  )
}

export default Home