
import React, { useContext, useEffect } from 'react'
import { currencyFormatter } from '../utils/formatting'
import { Button } from './ui/Button'
import { CartContext, useCart } from '../store/cartContext'

export interface MeailItemsProps {
  id: string
  name: string
  price: string
  description: string
  image: string
}

interface MealItemsProps {
  meal: MeailItemsProps
}

const server = "http://10.141.45.191:8000"

export const MeailItems = ({meal}: MealItemsProps) => {
  const {addItem} = useCart()

  return (
    <li className='meal-item'>
      <article>
        <img src={`${server}/${meal.image}`} alt={meal.name}/>
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>{currencyFormatter.format(Number(meal.price))}</p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={() => addItem({...meal, quantity: 0})}>Add to cart</Button>
        </p>
      </article>
    </li>
  )
}
