import { useState, useEffect, useContext } from "react";
import axios from "../axios";
import { userContext } from "./GlobalProvider";
import { useNavigate } from "react-router-dom";
import img from "../assets/delicious-chicken-legs.jpg";
import OrderDetails from "./OrderDetails";

function Orders() {
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const orderDisplay = async () => {
    let id = user._id;
    try {
      let response = await axios.post("/order/orderDisplay", { id });
      if (response) {
        setOrders(response.data.result);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error found in orderDisplay", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    orderDisplay();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

const handleOrderDetails = (orderId)=>{
  navigate(`/OrderDetails/${orderId}`);
}

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-green-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>
      <div className="max-w-4xl mx-auto space-y-6 w-[100%]">
        {orders && orders.length > 0 ? (
          orders.sort((a, b) => b._id.localeCompare(a._id)) 
          .map((order) => {
            const totalAmount = order.products.reduce((acc, item) => acc + item.price, 0);

            return (
              <div key={order._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-700">Order Status: {order.status} </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {order.products.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
                      <img
                        src={item.productId.image || img}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium text-gray-600">{item.productId.name}</h4>
                        {/* <p className="text-gray-500">Price: ₹{item.price}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-lg font-semibold text-orange-500 self-end">Total Price: ₹{totalAmount}</p>
                <button
                  onClick={()=>handleOrderDetails(order._id)}
                  className="self-end px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  More Details
                </button>
              </div>
            );
          })
        ) : (
          <h2 className="text-center text-xl text-white">No orders found</h2>
        )}
      </div>
    </div>
  );
}

export default Orders;
