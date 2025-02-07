
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import axios from '../axios';
import Cards from "./Cards";
import { useEffect, useState, useCallback, useContext} from 'react';
import { userContext } from "./GlobalProvider";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Menu() {
  const [loading, setLoading] = useState(true)
  const [allProducts, setProducts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { setUser } = useContext(userContext);

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
        console.log("Menu page Data fetch:", data);
        setProducts(data.result);
        dispatch(addProduct(data.result));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch]);

  useEffect(()=>{
    if(!isExist[0]){
      getProducts()
    }else{
      setProducts(isExist)
      setLoading(false)
    }
  },[isExist, getProducts])

  let offerProduct = allProducts?.filter((element) => element.offer === true) || [];
  let normalProduct = allProducts?.filter((element) => element.offer !== true) || [];


  const CartAdding = async (id, qty) => {
    console.log(qty);
    try {
      const response = await axios.post('/cart/addToCart', { id , qty }); 
      if (response.data != null) {
        console.log("data:", response.data);
        toast.success('Cart Added Successfully!')

      }else if(response.data == null){
        navigate('/login')
      }
    } catch (error) {
      console.error("error found in addToCart", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 pr-6">
        {/* -------------------------------Seasonal Offers------------------------- */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white tracking-wide">
            Seasonal Offers
          </h1>
        </div>
        <div className='pl-6'>
        <Cards product={offerProduct} addToCart={CartAdding} />
        </div>
      </div>

      {/* -------------------------------Most Popular Deals---------------------- */}
      <div className="text-center mt-16 mb-10">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          Our Most Popular Deals
        </h1>
      </div>
      <div className='pl-1'>

      <Cards product={normalProduct} addToCart={CartAdding} />
      </div>
      
    </div>
  );
}

export default Menu;
