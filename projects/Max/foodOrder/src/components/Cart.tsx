import { Modal } from './ui/Modal'
import { useCart } from '../store/cartContext'
import { currencyFormatter } from '../utils/formatting'
import { Button } from './ui/Button'
import { useUserProgress } from '../store/UserProgresContext'

export const Cart = () => {
  const {progress, hideCart,showCheckout} = useUserProgress()
  const {items, addItem, removeItem, } = useCart()

  const cartTotal = items.reduce((acum, i) => {
    return acum + (Number(i.price) * i.quantity)
  },0)

  return (
    <Modal className='cart' openDialog={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {
          items.map(i => {
            return <li className={"cart-item"} key={i.id}>
              <p>{i.name} - {currencyFormatter.format((Number(i.price) * i.quantity))}</p>
              <p className={"cart-item-actions"}>
                <button onClick={() => removeItem(i.id)}>-</button>
                <span>{i.quantity}</span>
                <button onClick={() => addItem(i)}>+</button>
              </p>
            </li>
          })
        }
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={hideCart}>Close</Button>
        {
          items.length === 0 ? null : <Button onClick={()=> {
            showCheckout()
          }}>Go to Checkout</Button>
        }
      </p>
    </Modal>
  )
}
