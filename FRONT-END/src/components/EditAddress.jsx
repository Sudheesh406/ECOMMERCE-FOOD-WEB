import { useState, useContext, useEffect, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import { userContext } from "./GlobalProvider";
import axios from "../axios";

function EditAddress({ open, handleClose, fromParent, toParent }) {
  const { user } = useContext(userContext);

  const [value, setValue] = useState(fromParent || {
    city: "",
    state: "",
    houseName: "",
    userId: user._id,
  });

  const [errors, setErrors] = useState({
    city: "",
    state: "",
    houseName: "",
    noChange: "",
  });

  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const houseNameRef = useRef(null);

  useEffect(() => {
    if (fromParent) {
      setValue(fromParent);
    }
  }, [fromParent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Remove "No changes detected" error when user modifies data
    if (JSON.stringify(value) !== JSON.stringify(fromParent)) {
      setErrors((prev) => ({ ...prev, noChange: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!value.city.trim()) {
      newErrors.city = "Please enter your city";
      cityRef.current.style.border = "2px solid red";
    }
    if (!value.state.trim()) {
      newErrors.state = "Please enter your state";
      stateRef.current.style.border = "2px solid red";
    }
    if (!value.houseName.trim()) {
      newErrors.houseName = "Please enter your house name";
      houseNameRef.current.style.border = "2px solid red";
    }

    // Check if data is unchanged
    if (JSON.stringify(value) === JSON.stringify(fromParent)) {
      newErrors.noChange = "No changes detected";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const { data } = await axios.put(`/editAddress/${fromParent._id}`, value);
      toParent((prev) =>
        prev.map((item) =>
          item._id === data.result._id ? { ...item, ...data.result } : item
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error updating address:", error);
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
          <h4 className="text-2xl text-gray-400">Manage Address</h4>
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
              Your City
            </label>
            <input
              id="city"
              name="city"
              value={value.city}
              onChange={handleChange}
              ref={cityRef}
              type="text"
              placeholder="Enter your city"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-400 font-medium">
              Your State
            </label>
            <input
              id="state"
              name="state"
              value={value.state}
              onChange={handleChange}
              ref={stateRef}
              type="text"
              placeholder="Enter your state"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
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
              ref={houseNameRef}
              type="text"
              placeholder="Enter your house name"
              className="w-full p-3 border border-gray-400 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.houseName && (
              <p className="text-red-500 text-sm mt-1">{errors.houseName}</p>
            )}
          </div>
          {errors.noChange && (
            <p className="text-red-500 text-sm mt-1">{errors.noChange}</p>
          )}
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

export default EditAddress;
