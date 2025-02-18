import { useState, useContext } from "react";
import { ImCancelCircle } from "react-icons/im";
import { userContext } from "./GlobalProvider";

import axios from "../axios";

function AddressForm({ open, handleClose, toParent}) {
  const { user } = useContext(userContext);

  const [value, setValue] = useState({
    city: "",
    state: "",
    houseName: "",
    userId: user._id
  });

  const handleChange = (e) => {    
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose()
    addAddress()
  };

 const addAddress = async ()=>{
    try {
        let response = await axios.post('/userAddress',value)
        if(response){
            console.log("response:",response);
           let withId = {
            id : response.data.result._id,
            city : value.city,
            state : value.state,
            houseName : value.houseName,
            userId: user._id
           }
            toParent(withId)
        }else{
            console.log("nothing is returned");
        }
    } catch (error) {
        console.error("error found in address posting",error);
        
    }
 }

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
      role="dialog"
      aria-hidden={!open}
    >
      <div className="bg-white p-6 rounded-lg w-1/3">
        <div className="relative">
          <h4 className="text-2xl text-gray-400">Manage Item</h4>
          <p className="mt-1 text-gray-400">
            Keep your records up-to-date and organized.
          </p>
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-800 text-xl"
            onClick={handleClose}
            aria-label="Close"
          >
            <ImCancelCircle />
          </button>
        </div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="city" className="block text-gray-400 font-medium">
              Your city
            </label>
            <input
              id="city"
              name="city"
              value={value.city}
              onChange={handleChange}
              type="text"
              placeholder="city"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-400 font-medium">
              Your state
            </label>
            <input
              id="state"
              name="state"
              value={value.state}
              onChange={handleChange}
              type="text"
              placeholder="state"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="houseName"
              className="block text-gray-400 font-medium"
            >
              House Name
            </label>
            <input
              id="houseName"
              name="houseName"
              value={value.houseName}
              onChange={handleChange}
              type="text"
              placeholder="houseName"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
