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


function Home() {
  let dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState([]);
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
 
  return (
    <div className="bg-gradient-to-r from-gray-900 to-green-900">
      {/* <hr></hr> */}
      <Screen />
      <div className="flex m-0 pl-16">
        <Cards
          product={offerProduct}
          addToCart={cartAdding}
          
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
