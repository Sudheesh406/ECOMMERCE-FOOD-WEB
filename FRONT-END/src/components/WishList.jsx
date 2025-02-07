import img from '../assets/delicious-chicken-legs.jpg';
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios'

function WishList() {

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
    <div className="pt-20">

      {/* product */}
      <div className="h-56 flex justify-between pl-12 gap-x-4 items-center pt-6 pr-12 pb-6">
      <div className="flex h-36 w-96 flex justify-between ">
      <img src={img} alt="image in orders" />
      <div className="text-white flex flex-col justify-center"> <h2>product</h2></div>
      </div>
      <div className="flex flex-col gap-y-6 w-20 pl-2 pr-2">
           
          <div  className="text-white gap-y-6 pl-2 pr-2 group relative">
            <div className="flex items-center text-2xl transition-transform transform flex-col">
            <button className="text-2xl text-white font-bold rounded transition-transform transform ">
              <MdDelete className="group-hover:text-red-500 group-hover:scale-125 transition-transform transform" />
            </button>
              <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                Delete
              </h1>
            </div>
          </div>
      </div>
      </div>
      <hr></hr>

      {/* product */}
      <div className="h-56 flex justify-between pl-12 gap-x-4 items-center pt-6 pr-12 pb-6">
      <div className="flex h-36 w-96 flex justify-between ">
      <img src={img} alt="image in orders" />
      <div className="text-white flex flex-col justify-center"> <h2>product</h2></div>
      </div>
      <div className="flex flex-col gap-y-6 w-20 pl-2 pr-2">
           
          <div  className="text-white gap-y-6 pl-2 pr-2 group relative">
            <div className="flex items-center text-2xl transition-transform transform flex-col">
            <button className="text-2xl text-white font-bold rounded transition-transform transform ">
              <MdDelete className="group-hover:text-red-500 group-hover:scale-125 transition-transform transform" />
            </button>
              <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                Delete
              </h1>
            </div>
          </div>
      </div>
      </div>
      <hr></hr>
      
      {/* product */}
      <div className="h-56 flex justify-between pl-12 gap-x-4 items-center pt-6 pr-12 pb-6">
      <div className="flex h-36 w-96 flex justify-between ">
      <img src={img} alt="image in orders" />
      <div className="text-white flex flex-col justify-center"> <h2>product</h2></div>
      </div>
      <div className="flex flex-col gap-y-6 w-20 pl-2 pr-2">
           
          <div  className="text-white gap-y-6 pl-2 pr-2 group relative">
            <div className="flex items-center text-2xl transition-transform transform flex-col">
            <button className="text-2xl text-white font-bold rounded transition-transform transform ">
              <MdDelete className="group-hover:text-red-500 group-hover:scale-125 transition-transform transform" />
            </button>
              <h1 className="text-red-500 hidden font-semibold group-hover:block absolute top-6 text-sm transition-opacity opacity-0 group-hover:opacity-100">
                Delete
              </h1>
            </div>
          </div>
      </div>
      </div>

      <hr></hr>
      </div>
      </div>
    
  )
}

export default WishList