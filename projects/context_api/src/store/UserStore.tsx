import { createContext, useContext } from "react";
import type { User } from "../App";


export const UserContext = createContext<User | undefined>(undefined)


export const useUser = (): User => {
  const user = useContext(UserContext)
  
  if (user === undefined) {
    throw new Error("There are no provider")
  }

  return user

}







