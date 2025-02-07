import { useState ,useEffect} from "react"
import img from '../assets/delicious-chicken-legs.jpg'
import {useSelector} from "react-redux";

function Orders() {
  const [loading,setLoading] = useState(true)

  let updatedProducts = useSelector(state => state.product.products[0]);
  console.log("Updated Products:", updatedProducts);

  useEffect(()=>{
    setInterval(() => {
      setLoading(false)
    }, 1000);
  },[])

  if (loading) {
    return(
      <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
   </div>
    )
  }
  return (
    
    <div className="h-full relative">
      <div className="absolute w-full z-50">
      <hr></hr>
      </div>
      <div className="pt-20 ">
        {/* product */}
        <div className="h-56 flex justify-evenly items-center pt-19 ">
        <div className="flex h-36 w-96 ">
       <img src={img} alt="image in orders" />
        </div>
        <div className="text-white w-96 flex flex-col gap-y-4"> <h2>product</h2> <p>Quantity</p></div>
        <div className="text-white  w-96 flex flex-col gap-y-3">  <p>order Quandity</p> <h2>price</h2> <p>Delivery status</p></div>
        <div className="flex flex-col gap-y-6 ">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 z-30">
        Cancel
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 z-30">
        View
        </button>
        </div>
        </div>
        <hr className="h-5 bg-gray-800"></hr>


      </div>
    </div>
  )
}

export default Orders