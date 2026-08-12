import React, { useRef, useState } from 'react'

export const CountEX = () => {

  const [count, setCount] = useState<number>(0)
  const countRef = useRef<number>(0)
    
  const handleClick = () => {
    setCount(prev => prev+1)
    countRef.current++

    console.log(`count ref in handle ${countRef.current}`)
    console.log(`count inside ${count}`)
  }
  console.log(`count outside ${count}`)
  
  return (
    <>
      <p>{count}</p>
      <button className='button' onClick={handleClick}>click</button>
    </>
  )
}
