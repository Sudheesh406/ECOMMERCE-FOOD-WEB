import { useEffect, useState } from "react";
import useApiCall from "../hooks/useApiCall";
import "./OurMostPopularDeals.css";
import axios from "../axios";
import Swal from "sweetalert2";

function UserList() {
  const [userList, setUserList] = useState([]);
  let totalUser = useApiCall("/userList");
  const [total, setTotal] = useState(0); 

  useEffect(() => {
    if (totalUser.value?.length) {
        let onlyUser = totalUser.value.filter((e)=>e.email != 'sudheesh@gmail.com')
      setUserList(onlyUser);
      setTotal(totalUser.value.length); 
    }
  }, [totalUser]);

  const userAccessBlock = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Email is temporarly Blocking",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Block it!",
      }).then(async(response)=>{
        if(response.isConfirmed){
            try {
              let result = await axios.post("./userAccessBlock", { id });
              if (result) {
                console.log("result:", result);
              }
            } catch (error) {
              console.error("error found in UserAccess", error);
            }

        }
      })
  };
  const userAccessUnBlock = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Email is UnBlocked",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, UnBlock it!",
      }).then(async(response)=>{
        if(response.isConfirmed){
            try {
              let result = await axios.post("./userAccessUnBlock", { id });
              if (result) {
                console.log("result:", result);
              }
            } catch (error) {
              console.error("error found in UserAccess", error);
            }

        }
      })
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-200 p-4">
          Total User : {total}
        </h2>
        <div className="overflow-y-auto container h-[560px]">
          {userList.length > 0 ? (
            <div className="space-y-4">
              {userList.map((element, index) => (
                <div
                  key={element._id || `normal-${index}`}
                  className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-lg font-medium text-white">
                      {element.username}
                    </span>
                    <span className="text-lg font-medium text-white">
                      {element.email}
                    </span>
                  </div>
                  <div className="space-x-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => userAccessBlock(element._id)}
                    >
                      Block
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                      onClick={() => userAccessUnBlock(element._id)}
                    >
                       Unblock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
