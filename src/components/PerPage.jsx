import submitIcon from '../assets/submit-icon.svg';
import { useContext, useRef } from 'react';
import { CryptoContext } from '../context/CryptoContext.jsx';

const PerPage = () => {
  const { setCoinsPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if(val >= 1 && val <= 250) {
      setCoinsPerPage(val);
      inputRef.current.value = val;
    }
  }

  return (
    <form className='relative flex items-center font-nunito mr-12'
    onSubmit={handleSubmit}>
      <label htmlFor='perpage'
      className='relative flex justify-center items-center mr-2 font-bold'>
        per page:{' '}
      </label>
      <input type='number' name='perpage' placeholder='10'
      min={1}
      max={250}
      className='w-16 rounded bg-gray-200 placeholder:text-gray-100
      pl-2 required outline-0 border border-transparent
      focus:border-cyan leading-4'
      ref={inputRef}/>
      <button type='submit' className='ml-1 cursor-pointer'>
        <img src={submitIcon} alt='submit'
        className='w-full h-auto'/>
      </button>
    </form>
  )
}

export default PerPage;