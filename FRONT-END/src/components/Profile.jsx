import { useEffect, useContext, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import axios from "../axios";
import { userContext } from "./GlobalProvider";
import EditAddress from "./EditAddress";
import UserForm from "./UserForm";
import PasswordChange from "./PasswordChange";
import Swal from "sweetalert2";
import img from "../assets/heropage.png";
function Profile() {
  const [getAddress, setGetAddress] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openUserEdit, setOpenUserEdit] = useState(false);
  const [retrivedData, setRetrivedData] = useState(null);
  const [changePassword, SetChangePassword] = useState(false);

  // let navigate = useNavigate();
  // const location = useLocation();
  const { user } = useContext(userContext);

  // async function auth() {
  //   try {
  //     let result = await axios.get("/authentication", {
  //       withCredentials: true,
  //     });
  //     if (result.data) {
  //       console.log("result:", result);
  //       let { id } = result.data.User;
  //       if (!id) {
  //         navigate("/login");
  //       }
  //     } else {
  //       navigate("/login", { state: { from: location } });
  //       console.log("data is not geting");
  //     }
  //   } catch (error) {
  //     console.error("error found in authentication", error);
  //   }
  // }

  const deleteAddress = async (id) => {
    if (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this address?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let response = await axios.post("/deletUser", { id });
            if (response.data) {
              console.log("Deleted:", response.data);
              setGetAddress((prev) =>
                prev.filter((address) => address._id !== id)
              );

              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "The address has been deleted successfully.",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          } catch (error) {
            console.error("Error deleting address", error);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete the address. Please try again later.",
            });
          }
        }
      });
    }
  };

  const retriveAddress = async (id) => {
    if (id) {
      try {
        let { data } = await axios.post("/retriveAddress", { id });
        if (data) {
          setOpenEdit(true);
          setRetrivedData(data.result);
          // setGetAddress((prev) => prev.filter(address => address._id == data._id));
        }
      } catch (error) {
        console.error("error found deleteAddress", error);
      }
    }
  };

  const UserDetails = async (id) => {
    setOpenUserEdit(true);
  };

  useEffect(() => {
    async function allAddress() {
      let id = user._id;
      try {
        let { data } = await axios.post("/getUserAddress", { id });
        if (data) {
          setGetAddress(data.result);
          console.log("data.result:", data.result);
        }
      } catch (error) {
        console.error("error found in geting allAddress", error);
      }
    }
    allAddress();
  }, [user._id]);

  return (
    <div className="flex justify-center items-center h-[649px] ">
  <div className="rounded-lg w-[65%] h-[95%]">
    <h2 className="text-left text-2xl font-extrabold text-gray-300 mb-4">
      User Profile
    </h2>
    <div className="flex p-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg">
      {/* First Section */}
      <div className="flex flex-col items-center w-1/3 justify-center">
        <img
          src={img}
          alt="Profile"
          className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white ring-8 ring-teal-500"
        />
        <p className="mt-4 text-lg font-extrabold text-teal-200">
          {user.username}
        </p>
      </div>
      {/* Second Section */}
      <div className="flex flex-col w-2/3 ml-4">
        <h3 className="text-2xl font-semibold mb-2 text-gray-300">
          General Information
        </h3>
        <div className="flex flex-col gap-4">
          <div className="p-2 bg-gray-900 shadow rounded">
            <p className="text-gray-300 pl-2 text-sm">Email</p>
            <p className="font-medium pl-2 text-gray-200">{user.email}</p>
          </div>
          <div className="p-2 bg-gray-900 shadow rounded">
            <p className="text-gray-300 pl-2 text-sm">Mobile Number</p>
            <p className="font-medium pl-2 text-gray-200">8078115004</p>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              onClick={UserDetails}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Address Section */}
    {getAddress?.length > 0 ? (
      <div className="mt-4 p-4  bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg">
        <h3 className="text-2xl font-semibold mb-2 text-gray-300">Address</h3>
        <div className="h-[226px] overflow-y-auto flex flex-col gap-5">
          {getAddress.map((element) => (
            <div
              className="p-6 rounded-lg shadow-lg w-full bg-gray-900"
              key={element._id}
            >
              <h1 className="text-gray-300 text-xl font-medium">
                {element.houseName}, {element.city}, {element.state}
              </h1>
              <div className="w-full flex justify-end mt-2 gap-3">
                <button
                  className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  onClick={() => retriveAddress(element._id)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => deleteAddress(element._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="p-6 text-center text-gray-500">No address found</div>
    )}        
      </div>
      {openEdit && (
        <EditAddress
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          fromParent={retrivedData}
          toParent={setGetAddress}
        />
      )}
      {openUserEdit && (
        <UserForm
          open={openUserEdit}
          handleClose={() => setOpenUserEdit(false)}
          changePassword={SetChangePassword}
        />
      )}
      {changePassword && (
        <PasswordChange
          open={changePassword}
          handleClose={() => SetChangePassword(false)}
        />
      )}
    </div>
  );
}

export default Profile;
