import Screen from "./Screen";
import Cards from "./Cards";
import Footer from "./Footer";
import axios from "../axios";
import { useEffect, useContext, useState, useCallback } from "react";
import { userContext } from "./GlobalProvider";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import OrderForm from "./orderForm";

function Home() {
  let dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);
  const [orderElement, setOrderElement] = useState({
    elementId: "",
    SelectedValue :""

  });
  const [form,setForm] = useState(false)

  const { setUser } = useContext(userContext);
  const navigate = useNavigate()  

  useEffect(() => {
    async function auth() {
      try {
        let { data } = await axios.get("/authentication");
        if (data) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Error fetching authentication details:", error);
      }
    }
    auth();
  }, [setUser]);

  let isExist = useSelector((state) => state.product.products);

  const getProducts = useCallback(async () => {
    try {
      let  {data}  = await axios.get("/products/Products");
      if (data) {
        console.log("Menu page Data fetch:", data.result);
        console.log("data.result:::",data.result);
        
        setAllProduct(data.result);
        dispatch(addProduct(data.result));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch]);

  useEffect(()=>{
    if(!isExist[0]){
      getProducts()
      console.log("isExistisExist",isExist);
    }else{
      setAllProduct(isExist)
    }
  },[isExist, getProducts])

  let offerProduct = allProduct.filter((element) => element.offer === true);

  const cartAdding = async (id, qty) => {
    try {
      let {data} = await axios.post("/cart/addToCart", { id, qty });
      if (data != null) {
        toast.success('Cart Added Successfully!')
        console.log("data:", data);
      } else if(data == null) {
        navigate('/Login')
      
      }
    } catch (error) {
      console.error("error found in addToCart", error);

    }
  };
  const newDataDetails =(elementId,SelectedValue)=>{
    console.log("elementId:",elementId,"SelectedValue:",SelectedValue);
    setOrderElement({
      elementId:elementId,
      SelectedValue:SelectedValue
    })
    setForm(true)
   }
 
   const handleDataFromChild = (data) => {
    console.log("datagtuiiii:", data);
    if (data && orderElement.elementId !== undefined && orderElement.SelectedValue !== undefined) {
      newOrder(data,orderElement)
    }
  };

  async function newOrder(data, orderElement) {
    try {
      
      const orderDetail = { ...data, ...orderElement };
        const response = await axios.post("/order/orderUpdate", { orderDetail });
        if (response && response.data) {
        console.log("Order updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error found in newOrder:", error);
    }
  }
  
  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900">
      {/* <hr></hr> */}
      <Screen />
      <div className="flex m-0 pl-16">
        <Cards
          product={offerProduct}
          addToCart={cartAdding}
          OrderNow = {newDataDetails}
        />
      </div>
      <Footer />
      {form &&(
         <OrderForm open={form} handleClose={()=>setForm(prev=>!prev)} />
        )}
    </div>
  );
}

export default Home;
