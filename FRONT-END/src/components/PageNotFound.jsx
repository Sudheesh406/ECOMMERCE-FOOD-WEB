import img from '../assets/pagePageNotFound.jpg'
import {Link} from 'react-router-dom'
function PageNotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
      <img src={img} alt="404" className='h-96 w-96' />
     <Link to="/" className="text-whit group relative">
          <button className='flex w-full justify-center rounded-md 
                    bg-red-700 px-3 py-1.5 text-sm font-semibold text-gray-300 
                    shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600'> {"<-"}Back To Home</button>
          </Link>
    </div>
  )
}

export default PageNotFound