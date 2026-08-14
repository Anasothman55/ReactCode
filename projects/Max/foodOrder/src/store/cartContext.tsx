
import { createContext, useContext, useReducer } from "react";

export interface ItemsType {
  id: string
  name: string
  price: string
  description: string
  image: string
  quantity: number
}

interface CartContextType {
  items: ItemsType[]
  addItem: (item: ItemsType) => void
  removeItem: (id: string) => void
  resetItem: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface State {
  items: ItemsType[]
}

type Action =
  | {
      type: "add_item";
      item: ItemsType;
    }
  | {
      type: "remove_item";
      id: string;
    }
  | { type: 'reset'};


function reducer(state: State, action: Action): State {
  const { type } = action
   
  switch (type) {
    case "add_item": {

      const existIndex = state.items.findIndex((e) => e.id === action.item!.id)
      const updatedItems = [...state.items]

      if (existIndex !== -1) {
        updatedItems[existIndex] = {
          ...updatedItems[existIndex],
          quantity: updatedItems[existIndex].quantity + 1,
        };  
      } else {
        updatedItems.push({ ...action.item, quantity: 1 })
      }
      
      return {...state, items: updatedItems}
    }
    case "remove_item": {
      const existIndex = state.items.findIndex((e) => e.id === action.id)
      if (existIndex === -1) {
        return state
      }

      const existingItem = state.items[existIndex]
      if (existingItem.quantity === 1) {
        return {...state, items: state.items.filter(i=> i.id !== action.id)}
      }
      const updatedItems = [...state.items]
      updatedItems[existIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      }
  
      return {...state, items: updatedItems}
    }

    case "reset": {
      return { ...state, items: []}
    }
    default:
      return state
  }
} 

export function CartContextProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {items: []})

  const cartContext: CartContextType = {
    items: state.items,
    addItem: (item: ItemsType) => {
      dispatch({type:"add_item", item: item})
    },
    removeItem: (id: string) => {
      dispatch({type: "remove_item", id:id})
    },
    resetItem: () => {
      dispatch({type: 'reset'})
    }
  }
  
  return (
    <CartContext value={cartContext}>
      {children}
    </CartContext>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);

  if (ctx === undefined) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}