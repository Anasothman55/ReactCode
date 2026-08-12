

import React, { forwardRef, useImperativeHandle, useRef, useState, type Ref } from 'react'

export type CounterType = {
  reset: () => void
}

interface CounterProps {
  name?: string
  
}

const Counter = forwardRef((props: CounterProps, ref: Ref<CounterType>) => {

  const [count, setCount] = useState<number>(0)
  
  const handleIncris = () => {
    setCount(prev => prev + 1)
  }

  const handleDescris = () => {
    setCount(prev => prev - 1)
  }
  
  const reset = () => {
    setCount(0)
  }

  useImperativeHandle(ref, () => ({
    reset
  }))

  return <div>
    <p>{count}</p>
    <button onClick={handleIncris}>incris</button>
    <button onClick={handleDescris}>descris</button>
  </div>

})


export const Ref2 = () => {
  const countRef = useRef<CounterType>(null)



  return (
    <div>
      <Counter ref={countRef}/>
      <button onClick={() => {
        countRef.current?.reset()
      }}>reset</button>
    </div>
  )
}


