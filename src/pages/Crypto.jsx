import Filters from '../components/Filters.jsx';
import TableComponent from '../components/TableComponent.jsx';
import Pagination from '../components/Pagination.jsx';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { CryptoContext } from '../context/';

const Crypto = () => {
  const { cryptoData, currency } = useContext(CryptoContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filters />
      <TableComponent data={cryptoData} currency={currency} />
      <Pagination />
      <Outlet />
    </section>
  )
}

export default Crypto