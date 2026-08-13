import { createContext, useContext, useState } from "react";



type UserContextType = {
  progress: 'checkout' | '' | 'cart'
  showCart: () => void
  hideCart: () => void
  showCheckout: () => void
  hideCheckout: () => void
}

export const userProgresContext = createContext<UserContextType | undefined>(undefined)



export const UserProgresContextProvider = ({children}: {children: React.ReactNode}) => {
  
  const [progress, setProgress] = useState<'checkout' | '' | 'cart'>('')

  const value: UserContextType = {
    progress: progress,
    showCart: () => {setProgress('cart')},
    hideCart: () => {setProgress('')},
    showCheckout: () => {setProgress('checkout')},
    hideCheckout: () => {setProgress('')},
  }

  return <userProgresContext.Provider value={value}>
    {children}
  </userProgresContext.Provider>
}

export const useUserProgress = (): UserContextType => {

  const ctx = useContext(userProgresContext)

  if (ctx === undefined) {
    throw new Error("useCart must be used inside CartProvider");
  }
  
  return ctx
} 




