import { useState , useRef , useEffect} from "react";
import PropType from "prop-types";
import axios from "../axios";
import { ImCancelCircle } from "react-icons/im";

// eslint-disable-next-line react/prop-types
export function EditProductDialog({ open, handleClose ,editData, sendDataToParent}) {
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    availability: "",
    offer: "",
  });


// ----------------------handleChange and validation in the product form---------------

  function handleChange(e) {
    const { name, value } = e.target;
  
    if (name === "name") nameRef.current.textContent = "";
    if (name === "offer") offerRef.current.textContent = "";
    if (name === "price") priceRef.current.textContent = "";
    if (name === "availability") availabilityRef.current.textContent = "";
  
    setValue((prev) => ({
      ...prev,
      [name]: name === "offer" || name === "availability" 
        ? value === "true" 
          ? true 
          : value === "false" 
          ? false 
          : "" 
        : value, 
    }));
  }

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const availabilityRef = useRef(null)
  const offerRef = useRef(null)

// ----------------------handleSubmit when product is in state----------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
  
    if (value.name.trim() === "") {
      nameRef.current.textContent = "name is required";
      valid = false;
    } else {
      nameRef.current.textContent = "";
    }
  
    if (value.price.trim() === "") {
      priceRef.current.textContent = "price is required";
      valid = false;
    } else {
      priceRef.current.textContent = "";
    }

    if (value.offer === "" || value.offer === undefined) {
      offerRef.current.textContent = "category is required";
      valid = false;
    } else {
      offerRef.current.textContent = "";
    }
  
    if (value.availability === "" || value.availability === undefined) {
      availabilityRef.current.textContent = "availability is required";
      valid = false;
    } else {
      availabilityRef.current.textContent = "";
    }
  
    if (valid) {
        let proper = Object.keys(value).every(key => value[key] === editData[key]);
        if(!proper){
          setValue({
            name: "",
            description: "",
            price: "",
            availability: "",
            offer: "",
          });
             try {
                const {data} = await axios.put("/products/updateProduct", value);
                if (data) {
                  console.log("putttt:",data.result);
                handleClose();
                sendDataToParent(data.result)
                }
              } catch (error) {
                console.error("error found in submitting", error);
              }
        }
      }
     
    }

  // --------------------------retrived data to form--------------------------

  useEffect(() => {
    if (editData) {
      setValue(editData);
    }
  }, [editData]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
      role="dialog"
      aria-hidden={!open}
    >
      <div className="bg-gray-300 p-6 rounded-lg w-1/3">
        <div className="relative">
          <h4 className="text-2xl text-black">Manage Item</h4>
          <p className="mt-1 text-gray-600">
            Keep your records up-to-date and organized.
          </p>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            onClick={handleClose}
            aria-label="Close"
          >
            <ImCancelCircle />
          </button>
        </div>
        <form className="space-y-4 mt-4 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p></p>
          </div>
          <div>
            <label htmlFor="Name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              id="Name"
              name="name"
              value={value.name}
              onChange={handleChange}
              type="text"
              placeholder="Product name"
              className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             <p ref={nameRef} className="text-red-500 p-0 m-0"></p> 
             </div>
          <div>
            <label
              htmlFor="CategoryOption"
              className="block text-gray-700 font-medium"
            >
              Category
            </label>
            <select
              id="CategoryOption"
              name="offer"
              value={ value.offer === true
                ? "true"
                : value.offer === false
                ? "false"
                : ""
            } 
            onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="true">Offer</option>
              <option value="false">Normal</option>
            </select>

            <p ref={offerRef} className="text-red-500 p-0 m-0"></p> 
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="Price"
                className="block text-gray-700 font-medium"
              >
                Price
              </label>
              <input
                id="Price"
                name="price"
                value={value.price}
                onChange={handleChange}
                type="text"
                placeholder="$$$"
                className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p ref={priceRef} className="text-red-500 p-0 m-0"></p> 

            </div>
            <div className="w-full">
              <label
                htmlFor="StockOption"
                className="block text-gray-700 font-medium"
              >
                Availability
              </label>
              <select
                id="StockOption"
                name="availability"
                value={
                  value.availability === true
                    ? "true"
                    : value.availability === false
                    ? "false"
                    : ""
                } 
                onChange={ handleChange}
                className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                  <option value="">Stock?</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
             <p ref={availabilityRef} className="text-red-500 p-0 m-0"></p> 

            </div>
          </div>
          <div>
            <label
              htmlFor="TextArea"
              className="block text-gray-700 font-medium"
            >
              Description (Optional)
            </label>
            <textarea
              id="TextArea"
              name="description"
              value={value.TextArea}
              onChange={handleChange}
              rows="4"
              placeholder="New arrived Product..."
              className="w-full p-3 border border-gray-400 bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           <p></p>

          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            Edit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditProductDialog.propTypes = {
  open: PropType.bool.isRequired,
  handleClose: PropType.func.isRequired,
};
