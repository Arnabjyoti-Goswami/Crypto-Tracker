import { useContext } from 'react';
import { CryptoContext, StorageContext } from '../context/';
import TableComponent from '../components/TableComponent.jsx';
import { Outlet } from 'react-router-dom';

const Saved = () => {
  const { savedCoinsData } = useContext(StorageContext);
  const { currency } = useContext(CryptoContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-4 mb-24 relative'>
    {
    savedCoinsData ? (
      <TableComponent data={savedCoinsData} currency={currency} />
    ) : 
    <div className='w-full mt-4 min-h-[60vh] py-8 border border-gray-100 rounded'>
      <h1 className='min-h-[60vh] text-lg text-cyan flex items-center justify-center'>
        There is no data to display!
      </h1>
    </div>
    }
    <Outlet />
    </section>
  )
}

export default Saved;