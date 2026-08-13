import React from 'react'
import { Modal } from './ui/Modal'
import { useCart } from '../store/cartContext'
import { currencyFormatter } from '../utils/formatting'
import { Button } from './ui/Button'
import { useUserProgress } from '../store/UserProgresContext'

export const Cart = () => {
  const {progress, hideCart} = useUserProgress()
  const {items} = useCart()
  const cartTotal = items.reduce((acum, i) => {
    return acum + (Number(i.price) * i.quantity)
  },0)

  return (
    <Modal className='cart' openDialog={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {
          items.map(i => {

            return <li key={i.id}>
              {i.name} - {i.quantity}
            </li>
          })
        }
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={hideCart}>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  )
}
