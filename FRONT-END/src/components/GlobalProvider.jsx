
import { createContext, useState , useEffect} from "react"

import App from '../App'


export const userContext = createContext()
  

function GlobalProvider() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUser(JSON.parse(data)); 
    }
  }, []); 

  return (
    <div className="hide-scrollbar">
      <userContext.Provider value={{user,setUser}}>
       <App />
      </userContext.Provider>
    </div>
  )
}

export default GlobalProvider