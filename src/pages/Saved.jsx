import { useContext } from 'react';
import { CryptoContext, StorageContext } from '../context/';
import TableComponent from '../components/TableComponent.jsx';

const Saved = () => {
  const { savedCoinsData } = useContext(StorageContext);
  const { currency } = useContext(CryptoContext);

  return (
    <section className='w-[80%] h-full flex flex-col mt-4 mb-24 relative'>
      <TableComponent data={savedCoinsData} currency={currency} />
    </section>
  )
}

export default Saved;