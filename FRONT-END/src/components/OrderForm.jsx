import { useState, useContext, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from "../axios";
import toast from "react-hot-toast";
import { userContext } from "./GlobalProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function OrderForm({
  open,
  handleClose,
  fullAmount,
  fromParent,
  newDataAddressDetails,
  Address,
  setCartClear
}) {
  const navigate = useNavigate()
  const [userAddress, setUserAddress] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [getAddress, setGetAddress] = useState([]);
  const { user } = useContext(userContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder();
  };

  async function updateOrder() {
    let data = fromParent;
    if (data && currentAddress) {
      newOrder();
      handleClose();
      try {
        let response = await axios.post("/order/orderUpdate", {
          data: data,
          currentAddress: currentAddress
        });
        if (response) {
          console.log("orderPosted success");
          const orderId = response.data.response._id;
          const totalAmount = response.data.response.products.reduce((sum, item) => sum + item.price, 0);
          if(orderId && totalAmount){
           let obj = {orderId,totalAmount}
            try {
              let result = await axios.post('/order/payment',obj)
            } catch (error) {
              console.error("error found in payment posting",error);
              
            }
          }
      }  
      } catch (error) {
        console.error("error found in updateOrder", error);
      }
    }else if(Address){
      newOrder();
      handleClose();
      try {
        let response = await axios.post("/order/orderUpdate", {
          data: data,
          currentAddress: Address.id
        });
        if (response) {
          console.log("orderPosted success");
        }
      } catch (error) {
        console.error("error found in updateOrder", error);
      }
    }
  }

  useEffect(() => {
    async function allAddress() {
      let id = user._id;
      console.log("id:", id);

      try {
        let { data } = await axios.post("/getUserAddress", { id });
        if (data) {
          setGetAddress(data.result);
          console.log("data:", data);
        }
      } catch (error) {
        console.error("error found in geting allAddress", error);
      }
    }
    allAddress();
  }, [user._id]);

  useEffect(() => {
    if (Address) {
      setUserAddress(Address);
    }
  }, [Address]);

  const checkoutPayment = async (order) => {
    console.log("order:",order);
    
    const options = {
      key: "rzp_test_ZKcJLyt29WoYex",
      amount: order.amount,
      currency: order.currency,
      name: "VINERGO",
      description: "Thank you for shopping with us!",
      order_id: order.id,
      handler: async function (response) {
        Swal.fire({
          title: "Order Confirmed!",
          text: "Your order has been successfully placed.",
          icon: "success",
          showCancelButton: false, 
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((response)=>{
          navigate('/orders')
         })
         
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
  
        try {
          const result = await axios.post("/payment/verify-payment", paymentData);
          if (result.data.success) {
            console.log("Payment is successful");
            toast.success("Order Created");
          } else {
            console.log("Payment verification failed"); 
            toast.error("Error while creating order");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "8078115004",
      },
      theme: {
        color: "#AF6900",
      },
    };
  
    const razorpay = new Razorpay(options);
    razorpay.open();
  };
  

  const newOrder = async () => {
    try {

      setCartClear(true)
      let response = await axios.post("/order/razorpay", {
        amount: fullAmount,
        currency: "INR",
      });
      if (response) {
        await checkoutPayment(response.data.order);
        // change order status ton completed
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formClose() {
    newDataAddressDetails();
  }
  const findAddress = (elementId) => {
    if (elementId) {
      setCurrentAddress(elementId);
    }
  };

  return (
  <div
  className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
    open ? "block" : "hidden"
  }`}
  role="dialog"
  aria-hidden={!open}
>
  <div className="bg-white p-8 rounded-2xl shadow-xl w-1/3">
    <div className="relative">
      <h4 className="text-3xl text-gray-700 font-semibold">Manage Item</h4>
      <p className="mt-1 text-gray-500">Select your current address</p>
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={handleClose}
        aria-label="Close"
      >
        <ImCancelCircle />
      </button>
    </div>

    {userAddress ? (
      <div className="p-6 flex justify-center">
        <h1 className="text-gray-600 text-xl font-bold">
          Address: {userAddress.state}, {userAddress.city},{" "}
          {userAddress.houseName}
        </h1>
      </div>
    ) : getAddress && getAddress.length > 0 ? (
      <div className="p-6 flex flex-col space-y-6 justify-center">
        {getAddress.map((element, index) => (
          <div className="flex flex-col border rounded-lg p-4 shadow-sm" key={index}>
            <h1 className="text-gray-600 text-xl font-medium">
              {element.state}, {element.city}, {element.houseName}
            </h1>
            <div className="w-full flex justify-end mt-2">
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none 
                       focus:ring-2 focus:ring-blue-300"
                onClick={() => findAddress(element._id)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="p-6 flex justify-center">
        <h1 className="text-red-500 text-xl font-bold">Add your Address!</h1>
      </div>
    )}

    <div className="w-full flex justify-between mt-3">
    <button
    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"

      onClick={formClose}
    >
      Create
    </button>
      <button
        type="submit"
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  </div>
</div>

  );
}

export default OrderForm;
