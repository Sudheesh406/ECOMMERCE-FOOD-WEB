import { useState,useContext } from "react";
import { ImCancelCircle } from "react-icons/im";
import { userContext } from "./GlobalProvider";
import axios from '../axios'
import { useEffect } from "react";

function UserForm({ open, handleClose, changePassword}) {
      const { user, setUser } = useContext(userContext);
    
  const [value, setValue] = useState({
    username: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isChanged = JSON.stringify(value) !== JSON.stringify(user.username);
    if (!isChanged) {
      console.log("No changes detected.");
      return;
    }else{
        edituserDetails(value)
    }
    handleClose();
  };

  const handlePasswordChange = (e)=>{
    console.log("hello");
    changePassword(true)
    handleClose();
  }

  const edituserDetails = async(data)=>{
    try {
        let result = await axios.put(`/edituserDetails/${user._id}`,{data})
        if(result){
            console.log("result:",result.data.result.username);
            setUser((prev) => ({ ...prev, username: result.data.result.username }));
        }
    } catch (error) {
        console.error("error found in edituserDetails",error);
        
    }
  }

  useEffect(() => {
    if (user) {
      setValue({ username: user.username });
    }
  }, [user]);

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
        <div>
            <label htmlFor="username" className="block text-gray-400 font-medium">
              New Username
            </label>
            <input
              id="username"
              name="username"
              value={value.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full flex gap-3 justify-end pt-3">
            <button
              
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}>
              Change
            </button>
            <button
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handlePasswordChange}>
              Change pasword
            </button>
          </div>
      </div>
    </div>
  );
}

export default UserForm;
