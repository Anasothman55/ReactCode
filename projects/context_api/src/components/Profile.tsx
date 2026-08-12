import React from 'react'
import type { User } from '../App'
import { useUser } from '../store/UserStore'

interface ProfileProps {
  
}

export const Profile = ({} : ProfileProps) => {

  const user = useUser()

  return (
    <div>{user.name}</div>
  )
}
