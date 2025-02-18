
import { createContext, useState } from "react"

import App from '../App'


export const userContext = createContext()
  

function GlobalProvider() {
  const [user, setUser] = useState("");

  return (
    <div className="hide-scrollbar">
      <userContext.Provider value={{user,setUser}}>
       <App />
      </userContext.Provider>
    </div>
  )
}

export default GlobalProvider