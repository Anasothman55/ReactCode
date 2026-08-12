import { useState } from "react"
import { Dashboard } from "./components/Dashboard"
import { UserContext } from "./store/UserStore"


export interface User {
  isSubscribed: boolean
  name : string
}



function App() {

  const [user] = useState<User>({
    isSubscribed: true,
    name:"anas"
  })

  return (
    <div>
      <UserContext.Provider value={user}>
        <Dashboard />

      </UserContext.Provider>
    </div>
  )
}

export default App
