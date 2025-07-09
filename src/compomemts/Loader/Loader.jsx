import { Blocks, Oval } from 'react-loader-spinner'

export default function Loader() {
    
  return (
    <div className='flex items-center justify-center'>
    <Blocks
      height="180"
      width="180"
      color="#2b7fff"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
      />
    </div>
  )
}
