import { useMemo, useEffect, useState,useContext } from "react";
import axios from "../axios";
import useApiCall from "../hooks/useApiCall";
import { Link } from "react-router-dom";
import img from "../assets/rb_32612.png";
import toast from 'react-hot-toast';
import OrderForm from "./orderForm";
import AddressForm from "./AddressForm";
import { userContext } from "./GlobalProvider";

function Carts() {
  const [loading, setLoading] = useState(true);
  const [cartClear, setCartClear] = useState(false);
  const [product, setProduct] = useState([]);
  const [newAddress, setnewAddress] = useState(null);
  // const [orderProduct, setOrderProduct] = useState(null)
    const { user } = useContext(userContext);
  
  const [form,setForm] = useState(false)
  const [addressForm,setAddressForm] = useState(false)
  
  let { value } = useApiCall("/cart/uploadToCart");
  let fullData = [];
  value.forEach((e) => {
    fullData.push(e.product);
  });

  const deleteData = async (id) => {
    try {
      let data = await axios.delete("/cart/removeFromcart", { data: { id } });
      if (data) {
        setProduct((prev) => prev.filter((item) => item._id !== id));
        toast.success('Cart removed Successfully!')
      }
    } catch (error) {
      console.error("error found in deleting data", error);
    }
  };

  const addMore = async (id) => {
    try {
      let data = await axios.post("/cart/addToCart", { id });
      if (data) {
        setProduct((prevProducts) =>
          prevProducts.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  price: item.price + item.price / item.quantity,
                }
              : item
          )
        );
        toast.success('Cart Added Successfully!')
      }
    } catch (error) {
      console.error("error found in addToCart", error);
    }
  };

  const removeOne = async (id) => {
    try {
      let data = await axios.post("/cart/removeProductQty", { id });
      console.log("data", data);
      if (data) {
        toast.success('Cart removed Successfully!')
        setProduct((prevProducts) =>
          prevProducts.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity > 1 ? item.quantity - 1 : item.quantity, 
                  price:
                    item.quantity > 1
                      ? item.price - item.price / item.quantity
                      : item.price,
                }
              : item
          )
        );
      } else {
        console.log("data not found");
      }
    } catch (error) {
      console.error("error found in addToCart", error);
    }
  };

  useEffect(() => {
    if (fullData.length !== 0) {
      setProduct(fullData);
      setProduct((prevProducts) =>
        prevProducts.map((item) => ({
          ...item,
          price: Number(item.quantity) * Number(item.unitPrice || item.price),
        }))
      );
    }
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    async function afterOrderCartClear() {
      let id = user._id
      try{
     const result = await axios.post("/cart/cartClear",{id})
     if(result){
       console.log("result:",result);
       setTimeout(() => {
         setLoading(false);
         setProduct([])
      }, 500);
     }
   } catch (error) {
     console.error("error found in removeCart",error);
   }
  }
  if(cartClear === true){
    afterOrderCartClear()
  }
  }, [cartClear]);
  
  const { totalPrice, totalProduct } = useMemo(() => {
    let totPrice = 0;
    let totProduct = 0;
    product.forEach((e) => {
      totPrice += Number(e.price);
      totProduct++;
    });
    return { totalPrice: totPrice, totalProduct: totProduct };
  }, [product]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

   const newDataDetails = ()=>{
    setForm(true)
   }

   const newDataAddressDetails =()=>{
    setAddressForm(true)
   }

   const toParent = (data)=>{
    if(data){
      setnewAddress(data)
    }
   }
   
  return (
    <div className="h-[650px] bg-gradient-to-r from-gray-900 to-green-900 text-white flex flex-col">
    <div className="pt-10 px-6 flex-1 overflow-auto">
      {product.length > 0 ? (
        <div className="flex flex-col items-center space-y-6 h-full">
        
          <div className="w-full md:w-3/4 space-y-4 overflow-auto max-h-[365px] pr-2">
            {product.map((element, index) => (
              <div className="flex items-center justify-between bg-white pr-5 rounded-lg shadow-md" key={element._id + "_" + index}>
                <img src={element.image} alt={element.name || "Product"} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex flex-col text-sm flex-1 px-4">
                  <h3 className="font-medium text-gray-500">{element.name}</h3>
                  <p className="text-orange-400">₹{element.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => addMore(element._id)}>+</button>
                  <span className="text-gray-400">{element.quantity}</span>
                  {element.quantity > 1 ? (
                    <button className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600" onClick={() => removeOne(element._id)}>-</button>
                  ) : (
                    <button className="px-3 py-1 bg-gray-300 text-white rounded hover:bg-gray-200" disabled>-</button>
                  )}
                  <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteData(element._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <img src={img} alt="empty cart" className="w-24 h-24 mb-4" />
          <h3 className="text-lg font-semibold">Your cart is empty!</h3>
          <p className="text-gray-400 text-sm mt-1">Add items to it now.</p>
          <Link to="/menu">
            <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  
    {product.length > 0 && (
      <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow-md fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <h3 className="text-center font-semibold text-lg mb-4 text-gray-400">Price Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-500 font-semibold">
            <span>Total Product</span>
            <span className="font-medium">{totalProduct}</span>
          </div>
          <div className="flex justify-between text-gray-500 font-semibold">
            <span>Discount</span>
            <span className="text-green-400 font-medium">-₹00.00</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-500">
            <span>Total Amount</span>
            <span>₹{totalPrice}.00</span>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="w-1/2 py-2 bg-green-500 w-[300px] text-white rounded hover:bg-green-600 font-medium" onClick={() => newDataDetails()}>
            Place Order
          </button>
        </div>
      </div>
    )}
  
    {form && <OrderForm open={form} handleClose={() => setForm(prev => !prev)} fullAmount={totalPrice} fromParent={product} newDataAddressDetails={newDataAddressDetails} Address={newAddress} setCartClear={setCartClear} />}
    {form && <AddressForm open={addressForm} handleClose={() => setAddressForm(prev => !prev)} toParent={toParent} />}
  </div>
  
  );
}


export default Carts;
