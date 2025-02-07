import img from '../assets/pagePageNotFound.jpg'
function PageNotFound() {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <img src={img} alt="404" className='h-96 w-96' />
    </div>
  )
}

export default PageNotFound