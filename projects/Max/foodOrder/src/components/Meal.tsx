import { useEffect, useState } from 'react'
import { MeailItems } from './MeailItems'

interface mealSchema {
  id: string
  name: string
  price: string
  description: string
  image: string
}

const server = "http://10.141.45.191:8000/meals"

export const Meal = () => {
  
  const [loadMeals, setLoadMeals] = useState<mealSchema[]>([])

  useEffect(() => {
    const fetchMeal = async () => {
        const res = await fetch(server)
        
        if (!res.ok) {
          return <div>
            error
          </div>
        }
        
        const meals: mealSchema[] = await res.json()
        setLoadMeals(meals)
      }

    fetchMeal()
  },[])

  return (
    <ul id="meals">
      {
        loadMeals.map(m => {
          return <MeailItems key={m.id} meal={m}/>
        })
      }
    </ul>
  )
}
