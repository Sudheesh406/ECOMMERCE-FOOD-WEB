import { useState ,useEffect, useContext} from "react"
import img from '../assets/delicious-chicken-legs.jpg'
import axios from '../axios'
import { userContext } from "./GlobalProvider";


function Orders() {
  const [loading,setLoading] = useState(true)
  const [orders, setOrders] = useState(null)
  const { user } = useContext(userContext);

  const orderDisplay = async()=>{
    if(user){
      let id = user._id
      try {
        let response = await axios.post('/order/orderDisplay',{id})
        if(response){
          setOrders(response.data.result)
        }
      } catch (error) {
        console.error("error found in orderDisplay",error);
        
      }
    }
  }
  

useEffect(()=>{
  setLoading(false)
  orderDisplay()
},[])
  
  if (loading) {
    return(
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
      <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
   </div>
    )
  }
  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 to-green-900 text-white">
      <div className="pt-10 px-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="mb-8">
              <div className="space-y-6">
                {order.products.map((item) => {
                  const unitPrice = item.productId.price;
                  const totalPrice = item.price;
                  const quantity = Math.floor(totalPrice / unitPrice); 
                  return (
                    <div key={item._id} className="flex items-center justify-between bg-white pr-5 rounded-lg shadow-md h-[160px] w-[860px] mx-auto">
                      <div className="pl-14">
                        <img
                          src={item.productId.image || img}  
                          alt={item.productId.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col text-sm flex-1 px-4">
                        <h3 className="font-medium text-gray-500">{item.productId.name}</h3>
                        <p className="text-orange-400">Price per unit: ₹{unitPrice}</p>
                        <p className="text-orange-400">Quantity: {quantity}</p>
                        <p className="text-orange-400">Total Price: ₹{totalPrice}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                          Cancel
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-xl text-white">No orders found</h2>
        )}
      </div>
    </div>
  );
  
}  

export default Orders