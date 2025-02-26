import { useState, useEffect, useCallback } from "react";
import { AddProductDialog } from "./ProductForm";
import { EditProductDialog } from "./ProEditForm";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios";
import { editProduct, addProduct, deleteProduct } from "../redux/productSlice";
import useApiCall from "../hooks/useApiCall";
import Swal from "sweetalert2";
import './OurMostPopularDeals.css'
// eslint-disable-next-line react/prop-types
function OurMostPopularDeals() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [normal, setNormal] = useState([]);
  const [offer, setOffer] = useState([]);
  const [retrivedData, setRetrivedData] = useState();
  const [productDetail, setProductDetail] = useState([]);
  const [cartproduct, setCartProduct] = useState();

  let allProducts = useSelector((state) => state.product.products);

  let getProducts = useCallback(async () => {
    try {
      let { data } = await axios.get("/products/Products");
      if (data) {
        console.log('data:',data);
        
        setProductDetail(data.result);
        dispatch(addProduct(data.result));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!allProducts[0]) {
      getProducts();
    } else {
      setProductDetail(allProducts);

    }
  }, [allProducts, getProducts]);

  //------------------------Used to form display and data retrieve---------------------

  function newDataDetails() {
    setForm(true);
  }
  function EditDataDetails() {
    setEditForm(true);
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
  function handleDataFromChild(product) {
    let isExist = product.result;
    if (isExist) {
      let total = offer.concat(normal);
      total.push(isExist);
      dispatch(addProduct(total));
      if (isExist.offer == true) {
        setOffer((prevItems) => [...prevItems, isExist]);
      } else {
        setNormal((prevItems) => [...prevItems, isExist]);
      }
    }
  }

  function handleEditDataFromChild(product) {
    if (product) {
      if (product.offer === true) {
        dispatch(editProduct(product));
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
  let data = useApiCall("/cart/getAllCartProducts");
  let array = data.value;
  useEffect(() => {
    setCartProduct(array);
  }, [array]);


 async function trashload(id) {
  
  Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      console.log("Deleting ID:", id);
       
      try {
        let { data } = await axios.post("/products/trashload", { id });
        
        if (data) {
          setNormal((prev) => prev.filter((element) => element._id !== id));
          setOffer((prev) => prev.filter((element) => element._id !== id));
          dispatch(deleteProduct(data.result));
          
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error found in trashload:", error);
        Swal.fire("Error!", "Something went wrong. Try again.", "error");
      }
    }
  });
}


  // --------------------------changing data from state and render data--------------------
  useEffect(() => {
    if (productDetail && productDetail.length > 0) {
      setOffer(productDetail.filter((element) => element.offer === true));
      setNormal(productDetail.filter((element) => element.offer !== true));
    }
  }, [productDetail]);
  return (
    <div className="max-w-[90%] mx-auto pt-5 rounded-lg">
      
      <div className="grid grid-cols-2 gap-10 p-0 m-0">
        {/* Left Section - Seasonal Offers */}
        <div className="bg-gray-700 flex flex-col items-center rounded-3xl h-[90%]">
          <div className="flex justify-between p-2 w-[86%] ">


        <h2 className="text-3xl font-bold p-2 text-gray-200">Seasonal <br/> Offers</h2>
        <div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => newDataDetails()}
            >
              Add New
            </button>
        </div>
          </div>
          
        <div className="p-5 rounded-lg shadow-lg max-h-[650px] max-w-[90%] overflow-y-auto container bg-gray-950">
       
          
          {offer.length > 0 &&
            offer.map((element, index) => (
              <div
                key={element._id || `offer-${index}`}
                className="border-b border-gray-700 pb-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-300">
                    Name: {element.name}
                  </span>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:ring focus:ring-yellow-300"
                      onClick={() => dataStore(element._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed focus:ring focus:ring-red-300"
                      onClick={() => trashload(element._id)}
                      disabled={cartproduct.some((item) => item._id === element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-400">Price: {element.price}</p>
                <p className="text-gray-400">Offer: 30%</p>
                <p className="text-gray-400">Sales: 4</p>
              </div>
            ))}
        </div>
        </div>
  
        {/* Right Section - Our most popular deals */}
        <div className="bg-gray-700 flex flex-col items-center rounded-3xl h-[90%]">
          <div className="flex justify-between w-[96%] p-4 ">
        <h2 className="text-3xl font-bold text-gray-200">
              Our most <br/> popular deals
            </h2>
            <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => newDataDetails()}
            >
              Add New
            </button>
            </div>
          </div>
        <div className="p-4  rounded-lg shadow-2xl max-h-[650px] overflow-y-auto container bg-gray-950 max-w-[90%]">
          <div className="flex justify-between items-center mb-6">
         
          </div>
          {normal.length > 0 &&
            normal.map((element, index) => (
              <div
                key={element._id || `normal-${index}`}
                className="border-b border-gray-700 pb-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium text-gray-300">
                    Name: {element.name}
                  </span>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:ring focus:ring-yellow-300"
                      onClick={() => dataStore(element._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed focus:ring focus:ring-red-300"
                      onClick={() => trashload(element._id)}
                      disabled={cartproduct.some((item) => item._id === element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-400">Price: {element.price}</p>
                <p className="text-gray-400">Sales: 4</p>
              </div>
            ))}
            </div>
        </div>
      </div>
  
      {form && (
        <AddProductDialog
          open={form}
          handleClose={() => setForm((prev) => !prev)}
          sendDataToParent={handleDataFromChild}
        />
      )}
      {editForm && (
        <EditProductDialog
          open={editForm}
          handleClose={() => setEditForm((prev) => !prev)}
          editData={retrivedData}
          sendDataToParent={handleEditDataFromChild}
        />
      )}
    </div>
  );
}

export default OurMostPopularDeals;
