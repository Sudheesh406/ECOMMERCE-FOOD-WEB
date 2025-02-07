
import {useState,useEffect, useCallback} from 'react'
import { AddProductDialog } from "./ProductForm";
import { EditProductDialog } from "./ProEditForm";
import {useSelector ,useDispatch} from "react-redux";
import axios from '../axios'
import {editProduct, addProduct, deleteProduct} from '../redux/productSlice'

// eslint-disable-next-line react/prop-types
function OurMostPopularDeals({ onSendData }) {
  const dispatch = useDispatch()
  const [form,setForm] = useState(false)
  const [editForm,setEditForm] = useState(false)
  const [normal,setNormal] =useState([])
  const [offer,setOffer] =useState([])
  const [retrivedData,setRetrivedData] =useState()
  const [productDetail,setProductDetail] = useState([])
 
  let allProducts = useSelector((state) => state.product.products);
    
    let getProducts = useCallback(async()=> {
      try {
        let { data } = await axios.get("/products/Products");
        if (data) {
          setProductDetail(data.result);
          dispatch(addProduct(data.result));
          onSendData(data.result.length) 
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, [dispatch, onSendData]);
  
    useEffect(() => {
      if (!allProducts[0]) {
        getProducts();
      } else {
        setProductDetail(allProducts);
        onSendData(allProducts.length)               
      }
    }, [allProducts, getProducts,onSendData]);

  //------------------------Used to form display and data retrieve---------------------

   function newDataDetails (){
    setForm(true)
   }
   function EditDataDetails (){
    setEditForm(true)
   }

   function dataStore(id) {
    EditDataDetails();
    let editData = productDetail.find((element) => element._id === id);
    console.log("editData:", editData);
    if (editData) {
      setRetrivedData(editData);
    } else {
      console.error("error found in retrieve data:");
    }
  }

// -------------------------handleDataFromChild to add new product and edit old Product-----------------------
 function handleDataFromChild(product){
  let  isExist = product.result
        if(isExist){
          let total = offer.concat(normal);
          total.push(isExist)
          dispatch(addProduct(total))
          if(isExist.offer == true){
            setOffer((prevItems) => [...prevItems, isExist])
          }else{
            setNormal((prevItems) => [...prevItems, isExist])
          }
        }
 }

 function handleEditDataFromChild(product) {
  if (product) {
    if (product.offer === true) {
      dispatch(editProduct(product))
      setOffer((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id ? { ...item, ...product } : item
        )
      );
    } else {
      setNormal((prevItems) =>
        prevItems.map((item) =>
          item._id === product._id ? { ...item, ...product } : item
        )
      );
    }
  }
}

// ------------------------------------Delete data---------------------------------------

   async function dataDelete (id){
    try {
      let value = await axios.delete('/products/removeProduct',{
        data: { id: id }
      })
      if(value){
        let {result} = value.data
        setNormal((prev) => prev.filter((element) => element._id != id));
        setOffer((prev) => prev.filter((element) => element._id != id));
        dispatch(deleteProduct(result))
      }
    } catch (error) {
      console.error("error found in retrieve data:",error);
      
    }
   }

// --------------------------changing data from state and render data--------------------
useEffect(() => {
  if (productDetail && productDetail.length > 0) {    
    setOffer(productDetail.filter((element) => element.offer === true));
    setNormal(productDetail.filter((element) => element.offer !== true));
  }
}, [productDetail]);

   return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 shadow-lg rounded-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-200">Seasonal Offers</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>newDataDetails()}>
        Add New
      </button>
    </div>
    {offer.length >0 &&
    offer.map((element,index) => (
      
    <div key={element._id || `offer-${index}`} className="border-b border-gray-200 pb-4 mb-4 ">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-medium text-gray-400">Name: {element.name}</span>
      <div className="space-x-2">
        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={()=>dataStore(element._id)}>Edit</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"onClick={()=>dataDelete(element._id)}>Delete</button>
      </div>
    </div>
    <p className="text-gray-400">Price: {element.price}</p>
    <p className="text-gray-400">Offer: 30%</p>
    <p className="text-gray-400">Sales: 4</p>
  </div>
      )
    )}
   
   <div className="flex justify-between items-center mb-6 mt-12">
      <h2 className="text-2xl font-bold text-gray-200">Our most popular deals</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>newDataDetails()}>
        Add New
      </button>
    </div>
    {normal.length >0 &&
    normal.map((element, index) => (
    <div key={element._id || `normal-${index}`} className="border-b border-gray-200 pb-4 mb-4 ">
    <div className="flex justify-between items-center mb-2">
      <span className="text-lg font-medium text-gray-400">Name: {element.name}</span>
      <div className="space-x-2">
      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={()=>dataStore(element._id)}>Edit</button>
      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"onClick={()=>dataDelete(element._id)}>Delete</button>
      </div>
    </div>
    <p className="text-gray-400">Price: {element.price}</p>
   
    <p className="text-gray-400">Sales: 4</p>
  </div>
    )
    )}

   {form &&(
    <AddProductDialog open={form} handleClose={()=>setForm(prev=>!prev)} sendDataToParent={handleDataFromChild}/>
   )}
   {editForm &&(
    <EditProductDialog open={editForm} handleClose={()=>setEditForm(prev=>!prev)} editData={retrivedData} sendDataToParent={handleEditDataFromChild}/>
   )}
  
  </div>
  )
}

export default OurMostPopularDeals