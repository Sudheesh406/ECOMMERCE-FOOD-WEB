import axios from '../axios';
import { useState, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userContext } from "./GlobalProvider";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(userContext); 
  const [UserValid, setUserValid] = useState();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [acess, setAccess] = useState({
    passwordOnly: false,
    userNameOnly: false
  });

  useEffect(() => {
    async function auth() {
      try {
        let { data } = await axios.get("/authentication");

        console.log("login data:", data);
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
      navigate('/');
    }
  }, [UserValid, navigate]); 

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    if (emailRef.current) emailRef.current.textContent = "";
    if (usernameRef.current) usernameRef.current.textContent = "";
    if (passwordRef.current) passwordRef.current.textContent = "";
  
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  

  let from = location?.state?.from || '/';

  const submit = (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (details.email === "") {
      emailRef.current.textContent = "Email is required";
      isValid = false;
    }
    if (details.password === "" && acess.passwordOnly) {
      passwordRef.current.textContent = "Password is required";
      isValid = false;
    }
    if (details.username === "" && acess.userNameOnly) {
      usernameRef.current.textContent = "Username is required"; 
      isValid = false;
    }

    if (!isValid) return;

    axios.post('http://localhost:3000/login', details, { withCredentials: true })
      .then((response) => {
        if (response.data.isExist) {
          console.log("password field open");
          setAccess({
            passwordOnly: true,
            userNameOnly: false
          });
        }
        if (response.data.value) {
          console.log("login success");
          setUser(response.data.result);
          navigate(from);
        }
        if (response.data.created) {
          console.log("new account created");
          setUser(response.data.result);
          console.log("response.data:", response.data);
          navigate(from);
        }
      })
      .catch((err) => {
        if(acess.passwordOnly) passwordRef.current.textContent = "password is incorrect";
        if (err.response?.data?.islogin) {
          setAccess({
            passwordOnly: true,
            userNameOnly: true
          });
        }
        if (err.response?.data?.account) {
          setAccess({
            passwordOnly: true,
            userNameOnly: false
          });
          setDetails({
            email: "",
            username: "",
            password: ""
          });
        }
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-green-900">
        <div className="w-16 h-16 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col pt-24 px-6 py-12 lg:px-8 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            Sign in or create account
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

            {(acess.userNameOnly && (
              <div className="mt-2">
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  value={details.username}
                  onChange={handleChange}
                />
                <p ref={usernameRef} className="text-red-500 p-0 m-0"></p>
              </div>
            ))}

            {(acess.passwordOnly && (
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
            ))}

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Continue
              </button>
              <div>
                <p className="text-blue-400 flex justify-center font-thin">
                  By continuing, you agree to all Conditions
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
