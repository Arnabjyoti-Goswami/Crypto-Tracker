import Filters from '../components/Filters.jsx';
import TableComponent from '../components/TableComponent.jsx';
import Pagination from '../components/Pagination.jsx';
import { Outlet } from 'react-router-dom';

const Crypto = () => {
  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filters />
      <TableComponent />
      <Pagination />
      <Outlet />
    </section>
  )
}

export default Crypto