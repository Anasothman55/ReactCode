
import { logo } from '../assets'
import { Button } from './ui/Button'
import { useCart } from '../store/cartContext'
import { useUserProgress } from '../store/UserProgresContext'

export const Header = () => {


  const {showCart} = useUserProgress()

  const {items} = useCart()
  const totalCartItem = items.reduce((totalNumber,  item) => {
    return totalNumber + item.quantity
  }, 0)

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo"/>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={showCart} textOnly >Cart ({totalCartItem})</Button>
      </nav>
    </header>
  )
}
