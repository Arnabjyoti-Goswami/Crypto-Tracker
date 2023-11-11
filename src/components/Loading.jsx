const Loading = ({classNames='', fillColor='cyan', innerText='please wait...'}) => {
  return (
  <div className={`w-full h-full flex justify-center items-center ${classNames}`}>
    <div className={`w-8 h-8 border-4 border-${fillColor} rounded-full border-b-gray-200 animate-spin`} 
    role='status'/>
    <span className='ml-2 capitalize'>
      {innerText}
    </span>
  </div>
  )
}

export default Loading;