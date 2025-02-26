import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "../axios";

function Otpverifier({ open, handleClose }) {
  const navigate = useNavigate();
  const [value, setValue] = useState({ otp: "" });
  const [error, setError] = useState("");
  const otpInputRef = useRef(null); 

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setError(""); 
  };

  const confirm = async () => {
    if (!value.otp.trim()) {
      setError("OTP field cannot be empty!"); 
      otpInputRef.current.focus(); 
      return;
    }

    try {
      const fullDetails = JSON.parse(localStorage.getItem("user"));
      if (!fullDetails) {
        console.error("User details not found in localStorage");
        return;
      }
      let combinedObject = {
        otp: value.otp,
        email: fullDetails.email,
        username: fullDetails.username,
        password: fullDetails.password,
      };
      let result = await axios.post("/signup", combinedObject);
      if (result.status === 200) {
        console.log("OTP Verified Successfully");
        handleClose();
        navigate("/");
        localStorage.removeItem("user");
      } else {
        setError("OTP Verification Failed");
      }
    } catch (error) {
      console.error("Error in OTP verification:", error);
      setError("Something went wrong. Please try again.");
    }
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
          <h4 className="text-2xl text-gray-400">Login Notification</h4>
          <p className="mt-1 text-gray-400">OTP is valid for 5 minutes</p>
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-medium">
              Enter your valid OTP
            </label>
            <input
              ref={otpInputRef} 
              id="otp"
              name="otp"
              value={value.otp}
              onChange={handleChange}
              type="number"
              placeholder="Enter OTP"
              className={`w-full p-3 border ${
                error ? "border-red-500" : "border-gray-400"
              } bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-800 text-xl"
            onClick={handleClose}
            aria-label="Close"
          >
            <ImCancelCircle />
          </button>
        </div>

        <div className="w-full flex gap-3 justify-end pt-3">
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={confirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otpverifier;
