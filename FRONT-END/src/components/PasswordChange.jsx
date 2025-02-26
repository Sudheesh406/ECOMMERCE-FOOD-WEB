import { ImCancelCircle } from "react-icons/im";
import { useState, useContext } from "react";
import axios from '../axios'
import { userContext } from "./GlobalProvider";


function PasswordChange({ open, handleClose}) {
    const { user } = useContext(userContext);
 const [value, setValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword:""
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const changePassword = async (exist) => {
    try {
      console.log("djkdj");
  
      let { data } = await axios.post(`/getPassword/${user._id}`, { exist });
  
      if (data.result) {  // Changed 'result' to 'data.result'
        console.log("result:", data.result);
      }
    } catch (error) {
      console.error("Error found in getPassword", error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (value.oldPassword && value.newPassword && value.confirmPassword) {
      if (value.newPassword === value.confirmPassword) {
        changePassword(value);
      } else {
        console.log("Confirm password is wrong");
      }
    }
  
    console.log("hello");
    handleClose();
  };
  
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
                <label htmlFor="oldPassword" className="block text-gray-400 font-medium">
                  Old Password
                </label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  value={value.oldPassword}
                  onChange={handleChange}
                  type="text"
                  placeholder="OldPassword"
                  className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            <div>
                <label htmlFor="newPassword" className="block text-gray-400 font-medium">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  value={value.newPassword}
                  onChange={handleChange}
                  type="text"
                  placeholder="newPassword"
                  className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-gray-400 font-medium">
                Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={value.confirmPassword}
                  onChange={handleChange}
                  type="text"
                  placeholder="confirmPassword"
                  className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full flex gap-3 justify-end pt-3">
                <button
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleSubmit}>
                  Submit
                </button>
                
              </div>
          </div>
        </div>
  )
}

export default PasswordChange