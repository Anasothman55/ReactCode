import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode
  openDialog?: boolean
}

export const Modal = ({ children, openDialog=false, className = '' }: ModalProps) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = dialogRef.current
    if (openDialog) {
      modal?.showModal()
    } 
    
    return () => modal?.close()
  }, [openDialog])

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className ?? ''} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLDivElement
  )
}
