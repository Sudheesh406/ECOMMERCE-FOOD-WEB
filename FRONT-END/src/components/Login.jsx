import axios from "../axios";
import { useState, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { userContext } from "./GlobalProvider";
import Adminlogmodal from "./Adminlogmodal";
import { IoLogIn } from "react-icons/io5";

function Login() {
  const [form, setForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(userContext);
  const [UserValid, setUserValid] = useState();
  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function auth() {
      try {
        let { data } = await axios.get("/authentication");
        if (data) {
          setUserValid(data.data);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching authentication details:", error);
        setLoading(false);
      }
    }
    auth();
  }, []);

  useEffect(() => {
    if (UserValid) {
      console.log("UserValid", UserValid);
      setLoading(false);
      navigate("/");
    }
  }, [UserValid, navigate]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginErrorRef = useRef(null); 

  const handleChange = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (emailRef.current) emailRef.current.textContent = "";
    if (passwordRef.current) passwordRef.current.textContent = "";
    if (loginErrorRef.current) loginErrorRef.current.textContent = ""; // Clear error on input change
  };

  let from = location?.state?.from || "/";

  const submit = async (e) => {
    e.preventDefault();
    let isValid = true;
  
    if (details.email === "") {
      emailRef.current.textContent = "Email is required";
      isValid = false;
    }
    if (details.password === "") {
      passwordRef.current.textContent = "Password is required";
      isValid = false;
    }
  
    if (!isValid) return;
  
    try {
      const response = await axios.post("http://localhost:3000/login", details, {
        withCredentials: true,
        timeout: 1000, 
      });
  
      console.log("response", response);
  
      if (response.status === 200) {
        if (response.data.result.role) {
          setForm(true);
        } else {
          setDetails({ email: "", password: "" });
          navigate(from);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "ECONNABORTED") {
        loginErrorRef.current.textContent = "Request timed out. Please try again.";
      } else {
        loginErrorRef.current.textContent = "Invalid email or password";
      }
    }
  };
  
  
  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex max-h-[649px] flex-1 flex-col pt-24 px-6 py-12 lg:px-8 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={details.email}
                  onChange={handleChange}
                />
                <p ref={emailRef} className="text-red-500 p-0 m-0"></p>
              </div>
            </div>

            <div className="mt-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                value={details.password}
                onChange={handleChange}
              />
              <p ref={passwordRef} className="text-red-500 p-0 m-0"></p>
            </div>

            {/* Invalid Login Message */}
            <p ref={loginErrorRef} className="text-red-500 text-sm text-center"></p>

            <div>
              <div className="flex flex-col gap-5">
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  Continue
                </button>
                <Link to="/Signup">
                  <h1 className="flex w-full justify-center rounded-md 
                    bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                    shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <IoLogIn className="text-xl" />
                    Create a Account
                  </h1>
                </Link>
              </div>
              <div>
                <p className="text-blue-400 flex justify-center font-thin">
                  By continuing, you agree to all Conditions
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {form && (
        <Adminlogmodal open={form} handleClose={() => setForm((prev) => !prev)} />
      )}
    </div>
  );
}

export default Login;
