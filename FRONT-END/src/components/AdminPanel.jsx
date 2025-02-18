
import OurMostPopularDeals from "./OurMostPopularDeals"
import {useEffect, useState} from 'react'
import axios from '../axios'


function AdminPanel() {
  const [dataFromChild, setDataFromChild] = useState('');
  const [users, setUsers] = useState([])

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
};

const TotalUser = async()=>{
    try {
      let {data} = await axios.get('/allUsers')
      if(data){
        let  value = data.result
        let totaluser = value.length
        setUsers(totaluser)  
      }
    } catch (error) {
      console.error('error found in collecting all users',error);
      
    }
}
useEffect(()=>{
  TotalUser()
},[])

  return (
      <div>

        <div>
        <div className="flex space-x-24">

        <div className="flex h-24 pl-2 items-center ">
        <h1 className="text-5xl pl-8 leading-tight text-white">Total Users : </h1>
        <h1 className="text-red-400 text-5xl pl-8 leading-tight">{users}</h1>
        </div>
        <div className="flex h-24 pl-2 items-center">
        <h1 className="text-5xl pl-8 leading-tight text-white">Total Products : </h1>
        <h1 className="text-red-400 text-5xl pl-8 leading-tight">{dataFromChild}</h1>
        </div>
        <div className="flex h-24 pl-2 items-center">
        <h1 className="text-5xl pl-8 leading-tight text-white">Today Sales : </h1>
        <h1 className="text-red-400 text-5xl pl-8 leading-tight">0</h1>
        </div>

        </div>
        </div>
        
        
        <OurMostPopularDeals onSendData={handleDataFromChild}/>
    </div>
  )
}

export default AdminPanel