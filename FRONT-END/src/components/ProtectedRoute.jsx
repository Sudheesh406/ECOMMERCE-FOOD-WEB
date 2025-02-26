import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./GlobalProvider";

const ProtectedRoute = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(userContext);

  const auth = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/authentication", {
        withCredentials: true,
      });

      if (data && data.data) {
        if(data.data.role){
          navigate('/AdminPanel')
        }
        const { _id } = data.data;
        setUser((prevUser) => {
          if (!prevUser || prevUser._id !== _id) {
            return data.data;
          }
          return prevUser;
        });

        if (!_id) {
          navigate("/login", { state: { from: location } });
        }
      } else {
        console.log("Data not found, redirecting to login.");
        navigate("/login", { state: { from: location } });
      }
    } catch (error) {
      console.error("Error during authentication", error);
      navigate("/login", { state: { from: location } });
    }
  };

  useEffect(() => {
    auth();
 
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
