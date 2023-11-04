import ReactDOM from 'react-dom';

const CryptoDetails = () => {
  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full
    bg-gray-200 bg-opacity-30 backdrop-blur-sm
    flex items-center justify-center font-nunito'>
      <div className='w-[65%] h-[75%] relative rounded-lg
      bg-gray-300 bg-opacity-75 text-white'>
        CryptoDetails
      </div>
    </div> ,
    document.getElementById("model")
  )
}

export default CryptoDetails;