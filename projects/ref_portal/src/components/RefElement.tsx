import React, { useEffect, useRef } from 'react'

export const RefElement = () => {

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(()=> {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='Type something' />
    </div>
  )
}
