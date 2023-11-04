import selectIcon from '../assets/select-icon.svg';

const Sorting = () => {
  return (
    <label className='relative flex justify-center items-center'>
      <span className='font-bold mr-2'>sort by:</span>
      <select name="sortby"
      className='rounded bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize
      focus:outline-0'>
        <option value='market_cap_asc'>
          market cap asc
        </option>
        <option value='market_cap_desc'>
          market cap desc
        </option>
        <option value='volume_asc'>
          volume asc
        </option>
        <option value='volume_desc'>
          volume desc
        </option>
        <option value='id_asc'>
          id asc
        </option>
        <option value='id_desc'>
          id desc
        </option>
      </select>
      <img src={selectIcon} alt='sort' className='w-[1rem] h-auto absolute right-1 top-2 pointer-events-none'/>
    </label>
  )
}

export default Sorting;