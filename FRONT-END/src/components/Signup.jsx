import axios from "../axios";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "./GlobalProvider";
import Otpverifier from "./Otpverifier";
import { IoLogIn } from "react-icons/io5";
import Swal from "sweetalert2";

function Signup() {

    const [otpForm, setOtpForm] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);
    const [UserValid, setUserValid] = useState();
    const [loading, setLoading] = useState(false);
  
    const [details, setDetails] = useState({
      email: "",
      username:"",
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
      const usernameRef = useRef(null);
      const passwordRef = useRef(null);
    
      const handleChange = (e) => {
        setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (emailRef.current) emailRef.current.textContent = "";
        if (usernameRef.current) usernameRef.current.textContent = "";
        if (passwordRef.current) passwordRef.current.textContent = "";
      };

      const submit = async (e) => {
        e.preventDefault();
        let isValid = true;
    
        if (details.email === "") {
          emailRef.current.textContent = "Email is required";
          isValid = false;
        }
        if (details.username === "") {
          usernameRef.current.textContent = "username is required";
          isValid = false;
        }
        if (details.password === "") {
          passwordRef.current.textContent = "Password is required";
          isValid = false;
        }
        if (!isValid) return;
        try {
          localStorage.setItem("user", JSON.stringify(details));
          const response = await axios.post("http://localhost:3000/signup", details, { withCredentials: true });
          if (response.status === 201) {
            setOtpForm(true)
            setDetails({ email: "", username:"", password: "" });
          }else if(response.status === 200){
            navigate('/')
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'warning',
              title: 'User Already Exists',
              text: 'You already have an account. Please log in!',
              confirmButtonText: 'Go to Login',
              showCancelButton: true,
              cancelButtonText: 'Cancel',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/login');
              }
            }); 
          } else {
            console.error("An error occurred:", error);
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
          Signup
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

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                value={details.username}
                onChange={handleChange}
              />
              <p ref={usernameRef} className="text-red-500 p-0 m-0"></p>
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
        
          <div>
            <div className="flex flex-col gap-5">
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Continue
              </button>
              <Link to="/Login">
                <h1 className="flex w-full justify-center rounded-md 
                  bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white 
                  shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <IoLogIn className="text-xl" />
                  Login
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
    {otpForm && (
      <Otpverifier
        open={otpForm}
        handleClose={() => setOtpForm((prev) => !prev)}
      />
    )}
  </div>
  )
}

export default Signup