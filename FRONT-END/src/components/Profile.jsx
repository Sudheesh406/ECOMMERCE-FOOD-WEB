
import { useEffect } from "react"
import { useNavigate ,useLocation} from "react-router-dom"
import axios from 'axios'


function Profile() {
  let navigate = useNavigate()
  const location = useLocation()
  async function auth() {
    try {
      let result = await axios.get('http://localhost:3000/authentication',{
        withCredentials : true,
      })
      if(result.data){
        console.log("result:",result);
        let {id}  = result.data.User
      if(!id){
        navigate('/login')
      }
      }else{
        navigate('/login',{state:{from:location}})
          console.log("data is not geting");
      }
      
      
    } catch (error) {
      console.error("error found in authentication",error);
      
    }
  }

  useEffect(()=>{
    auth()
  },[])

  return (
    <div className="h-full relative">
      <div className="absolute w-full z-50">
      <hr></hr>
      </div>
      <div className="pt-20 bg-gray-900">
      <div className="flex h-screen">
      {/* Sidebar
      <div className="w-1/4 bg-gray-00 p-4">
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="rounded-full w-16 h-16"
          />
          <h2 className="mt-2 text-lg font-semibold">Hello, Sudheesh Unni</h2>
        </div>
        <nav>
          <ul className="space-y-4">
            <li className="font-semibold text-blue-600">MY ORDERS</li>
            <li className="font-semibold">ACCOUNT SETTINGS</li>
            <ul className="pl-4 space-y-2">
              <li className="text-blue-600">Profile Information</li>
              <li>Manage Addresses</li>
              <li>PAN Card Information</li>
            </ul>
            <li className="font-semibold">PAYMENTS</li>
            <ul className="pl-4 space-y-2">
              <li>Gift Cards</li>
              <li>Saved UPI</li>
              <li>Saved Cards</li>
            </ul>
            <li className="font-semibold">MY STUFF</li>
            <ul className="pl-4 space-y-2">
              <li>FAQs</li>
            </ul>
          </ul>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <button className="text-blue-600">Edit</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Second Name"
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Your Gender</label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Male" checked readOnly />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Female" readOnly />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow mt-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Email Address</h3>
            <button className="text-blue-600">Edit</button>
          </div>
          <input
            type="email"
            placeholder="email"
            className="mt-4 p-2 w-full border rounded"
          />
        </div>
        <div className="bg-white p-6 rounded shadow mt-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Mobile Number</h3>
            <button className="text-blue-600">Edit</button>
          </div>
          <input
            type="text"
            placeholder="Phone"
           
            className="mt-4 p-2 w-full border rounded"
          />
        </div>
          </div>
        </div>

        
      </div>
    </div>
      </div>
    </div>
  )
}

export default Profile