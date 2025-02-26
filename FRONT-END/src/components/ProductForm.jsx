import { useState , useRef } from "react";
import PropType from "prop-types";
import axios from "../axios";
import { ImCancelCircle } from "react-icons/im";

// eslint-disable-next-line react/prop-types
export function AddProductDialog({ open, handleClose ,sendDataToParent}) {
  const [image, setImage] = useState(null)
  const [value, setValue] = useState({
    name: "",
    description: "",
    price: "",
    availability: "",
    offer: "",
    status:"",
  });


// ----------------------handleChange and validation in the product form---------------

  function handleChange(e) {
    const { name, value, type, files } = e.target;

    if (name === "image") imageRef.current.textContent = "";
    if (name === "name") nameRef.current.textContent = "";
    if (name === "offer") offerRef.current.textContent = "";
    if (name === "price") priceRef.current.textContent = "";
    if (name === "availability") availabilityRef.current.textContent = "";
  
    if (type === "file") {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg","image/avif"];
      
      if (files[0] && allowedTypes.includes(files[0].type)) {
        setImage(files[0]);
        console.log("image:",files[0]);
      } else {
        imageRef.current.textContent = "Only PNG, JPG, AVIF and JPEG files are allowed.";
        setImage(null);
      }
      
      return;
    }
    

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

  const imageRef = useRef(null)
  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const availabilityRef = useRef(null)
  const offerRef = useRef(null)

// ----------------------handleSubmit when product is in state----------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if(!image){ 
      imageRef.current.textContent = "Image is required";
      valid = false;
    } else {
      console.log("image:",image);
      
      imageRef.current.textContent = "";
    }

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
      handleClose();
      console.log('value:',value);
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", value.price);
      formData.append("availability", value.availability);
      formData.append("offer", value.offer);
      formData.append("status", true);
      if (image) {
        formData.append("image", image); 
      }
      try {
        const response = await axios.post("/products/createProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
      
        console.log("Success:", response.data);
      
        if (response.data) {
          sendDataToParent(response.data);
        }
      } catch (error) {
        console.error("Error found in submitting:", error);
      }
      
    }
  };

  // --------------------------retrived data to form--------------------------

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
          <div className="flex flex-col items-center">
          {image && (
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded"
              />
            )}
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden" // Hide the default input UI
            />
            {/* Custom Upload Button */}
            <label
              htmlFor="image"
              className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600"
            >
              Choose Image
            </label>
            <p ref={imageRef} className="text-red-500 p-0 m-0"></p>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddProductDialog.propTypes = {
  open: PropType.bool.isRequired,
  handleClose: PropType.func.isRequired,
};
