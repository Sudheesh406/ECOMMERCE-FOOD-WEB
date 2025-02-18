import { Link, Outlet, useLocation } from "react-router-dom";
import { BiSolidCart } from "react-icons/bi";
import { BiPackage } from "react-icons/bi";
import { LuCookingPot } from "react-icons/lu";
import { SiIfood } from "react-icons/si";
import { RiAccountCircle2Line } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { userContext } from "./GlobalProvider";
import { useContext, useEffect, useState } from "react";
import axios from "../axios";
// import { AiFillExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [admin, setAdmin] = useState(false);
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function logOut() {
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
  }

  useEffect(() => {
    if (user?.role === true) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user?.role]);

  const linkDestination = admin ? "/AdminPanel" : "/Profile";
  const linkText = admin ? "AdminPanel" : "Profile";

  return (
    <>
      <div className="flex pl-14 justify-between items-center h-20">
        <div className="flex justify-between items-center w-3/6">
          <div>
            <Link to="/" className="text-4xl font-bold text-orange-500">
              <div className="flex items-center gap-5 text-orange-500 md:text-3xl font-bold leading-snug">
                <SiIfood />
                FOODYY
              </div>
            </Link>
          </div>
          <div className="flex justify-evenly">
            <Link to="/" className="text-white pl-12 pr-12 group relative">
              <div className="flex items-center text-2xl transition-transform transform flex-col">
                <IoHome
                  className={`transition-transform transform ${
                    location.pathname === "/"
                      ? "text-red-500 border-b-2 border-red-500"
                      : ""
                  }`}
                />
                <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                  Home
                </h1>
              </div>
            </Link>

            <Link to="/Menu" className="text-white pl-12 pr-12 group relative">
              <div className="flex items-center text-2xl transition-transform transform flex-col">
                <LuCookingPot
                  className={`transition-transform transform ${
                    location.pathname === "/Menu"
                      ? "text-red-500 border-b-2 border-red-500"
                      : ""
                  }`}
                />
                <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                  Menu
                </h1>
              </div>
            </Link>

            <Link to="/Carts" className="text-white pl-12 pr-12 group relative">
              <div className="flex items-center text-2xl transition-transform transform flex-col">
                <BiSolidCart
                  className={`transition-transform transform ${
                    location.pathname === "/Carts"
                      ? "text-red-500 border-b-2 border-red-500"
                      : ""
                  }`}
                />
                <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                  Cart
                </h1>
              </div>
            </Link>

            <Link to="/About" className="text-white pl-12 pr-12 group relative">
              <div className="flex items-center text-2xl transition-transform transform flex-col">
                <BsPersonWorkspace
                  className={`transition-transform transform ${
                    location.pathname === "/About"
                      ? "text-red-500 border-b-2 border-red-500"
                      : ""
                  }`}
                />
                <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                  About
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-3 mr-2">
          {/* <input
            type="text"
            placeholder="Find your cravings...🥪"
            className="p-2 pr-28 bg-green-800 text-white rounded-2xl border h-8"
          /> */}
          <div className="pl-12 text-orange-500 font-bold text-sm">
            {user?.username || " "}
          </div>
          <div className="text-white pl-12 pr-12 group relative">
            <div className="flex items-center text-2xl transition-transform transform flex-col">
              <RiAccountCircle2Line className="group-hover:text-red-500 group-hover:scale-125 transition-transform transform" />
              <div className="hidden font-semibold group-hover:block absolute top-6 left-[-85px] text-sm transition-opacity opacity-0 group-hover:opacity-100">
                <div className="w-26 h-32  flex flex-col items-center">
                  {user ? (
                    <>
                      <Link to={linkDestination}>
                        <h1 className="font-semibold text-sm pl-7 pr-8 flex self-center pb-2 pt-6 hover:text-red-500 items-center gap-x-2">
                          <RiAccountCircle2Line className="text-xl" />
                          {linkText}
                        </h1>
                      </Link>
                      <Link to="/Orders">
                        <h1 className="font-semibold text-sm pl-7 pr-8 flex self-center pb-2 pt-3 hover:text-red-500 items-center gap-x-2">
                          <BiPackage className="text-xl" />
                          Orders
                        </h1>
                      </Link>
                      <button
                        className="flex gap-3 pt-2 font-semibold text-sm hover:text-red-500"
                        onClick={logOut}
                      >
                        <IoLogIn className="text-xl" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/Login">
                      <h1 className="font-semibold text-sm pl-7 pr-11 flex self-center pb-2 pt-3 hover:text-red-500 items-center gap-x-2">
                        <IoLogIn className="text-xl" />
                        Login
                      </h1>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
