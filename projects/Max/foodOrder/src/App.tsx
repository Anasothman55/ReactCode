import { Cart } from "./components/Cart"
import { Header } from "./components/Header"
import { Meal } from "./components/Meal"
import { CartContextProvider } from "./store/cartContext"
import { UserProgresContextProvider } from "./store/UserProgresContext"
import Chekout from "./components/Chekout.tsx";


function App() {

  return (
    <UserProgresContextProvider>
      <CartContextProvider>
        <Header/>
        <Meal/>
        <Cart/>
        <Chekout/>
      </CartContextProvider>
    </UserProgresContextProvider>
  )
}

export default App
