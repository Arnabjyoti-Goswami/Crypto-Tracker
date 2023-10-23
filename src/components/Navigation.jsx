import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className='w-[40%] mt-16 flex justify-around align-middle
    border border-cyan rounded-lg'>
      <NavLink to='/'
      end
      className={
        ({isActive}) => {
          return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-grey-300' : 'bg-gray-200 text-gray-100 hover:text-cyan'}`;
        }
      }>
        Crypto
      </NavLink>
      <NavLink to='/trending'
      end
      className={
        ({isActive}) => {
          return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-grey-300' : 'bg-gray-200 text-gray-100 hover:text-cyan'}`;
        }
      }>
        trending
      </NavLink>
      <NavLink to='/saved'
      end
      className={
        ({isActive}) => {
          return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold ${isActive ? 'bg-cyan text-grey-300' : 'bg-gray-200 text-gray-100 hover:text-cyan'}`;
        }
      }>
        saved
      </NavLink>
    </nav>
  )
}

export default Navigation