import OurMostPopularDeals from "./OurMostPopularDeals";
import { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { userContext } from "./GlobalProvider";
import { useNavigate, Link } from "react-router-dom";
import useApiCall from "../hooks/useApiCall";

function AdminPanel() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function auth() {
      try {
        let { data } = await axios.get("/authentication");
        if (!data) {
          setLoading(false);
          navigate("/");
        } else if (data.data.role == true) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching authentication details:", error);
        setLoading(true);
      }
    }
    auth();
  }, []);



  const TotalUser = async () => {
    try {
      let { data } = await axios.get("/allUsers");
      if (data) {
        let value = data.result;
        let totaluser = value.length;
        setUsers(totaluser);
      }
    } catch (error) {
      console.error("error found in collecting all users", error);
    }
  };

  const logOUt = async () => {
    try {
      const result = await axios.get("/logout");
      if (result) {
        console.log("Logged out successfully");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

let totalPro = useApiCall("/products/Products")
let totalOrder = useApiCall("/order/totalOrder");
let value = totalOrder.value[0]; 

useEffect(() => {
  if (value?.products?.length) {
    console.log("value:", value);
        let sales = 0;
    value.products.forEach((e) => {
      sales += e.price || 0;
    });
    setTotalSales(sales);
  }
}, [value]);


  useEffect(() => {
    TotalUser();
  }, []);

  if (Loading) {
    return (
      <div className="flex items-center h-[800px] justify-center bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div>
    <div className="p-6 bg-gradient-to-r from-gray-900 to-green-900 min-h-screen">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-6 text-gray-300">Admin Dashboard</h1>
      <div>
      <button className="bg-red-600 text-white py-2 px-4 rounded" onClick={logOUt}>logout</button>
      </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="p-4 bg-gray-400 shadow rounded flex items-center gap-4 ">
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-xl font-bold text-gray-700">{users}</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-400 shadow rounded flex items-center gap-4 ">
          <div>
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-xl font-bold text-gray-700">{totalOrder.value.length}</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-400 shadow rounded flex items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-xl font-bold text-gray-700">${totalSales}</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-400 shadow rounded flex items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-xl font-bold text-gray-700">{totalPro.value.length}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={()=>navigate("/UserList")}>View Users</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={()=>navigate("/OurMostPopularDeals")}>Manage Products</button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded"onClick={()=>navigate("/OrdersList")} >View Orders</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">More Details</button>
      </div>
    </div>
    </div>
  );
}

export default AdminPanel;
