import { useState, useEffect } from "react";
import axios from "../axios";

function OrdersList() {
  const [totalOrder, setTotalOrder] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/order/totalOrder");

      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setTotalOrder(response.data);
      } else if (response.data && Array.isArray(response.data.result)) {
        setTotalOrder(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const orderStatus = async (id) => {
    try {
      let result = await axios.post("/order/orderStatus", { id });
      if (result.data) {
        console.log("Order updated:", result.data);
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-200 p-4">
          Total Orders: {totalOrder.length}
        </h2>
        <div className="overflow-y-auto container h-[560px]">
          {totalOrder.length > 0 ? (
            <div className="space-y-4">
              {totalOrder.map((element, index) => {
                let totalAmount = element.products.reduce(
                  (sum, product) => sum + (product.price || 0),
                  0
                );

                return (
                  <div
                    key={element._id || `normal-${index}`}
                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium text-white">
                        <strong>Status:</strong>{" "}
                        <span className="text-gray-300">{element.status}</span>
                      </span>
                      <span className="text-lg font-medium text-white">
                        <strong>Order Id:</strong> {element._id}
                      </span>
                    </div>

                    <div className="flex justify-between items-start mt-2">
                      <div>
                        <strong className="text-white">Products:</strong>
                        <ul className="ml-4 list-disc text-gray-300">
                          {element.products.map((product) => (
                            <li key={product.productId._id}>
                              {product.productId.name} - ₹{product.price}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span className="text-lg font-medium text-white">
                        <strong>Total Amount:</strong> ₹{totalAmount}
                      </span>
                    </div>

                    <div className="mt-4 text-center flex justify-end">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => orderStatus(element._id)}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersList;
