import { createContext, useReducer, useState } from "react";

interface ItemsType {
  id: string,
}

interface CartContextType {
  items: ItemsType[]
  addItem: (item: ItemsType) => void
  removeItem: (id: string) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface State {
  items: ItemsType[]
}

interface Action {
  type: "add_item" | 'remove_item'
  item: ItemsType
}

function reducer (state: State, action: Action) {
  const {type} = action

  switch(type) {
    case "add_item":
      const 
    case "remove_item":
      return state
    default:
      return state
  }
} 

export function CartContextProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {items: []})

  return (
    <CartContext value={}>
      {children}
    </CartContext>
  );
}
