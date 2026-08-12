import React, { useContext } from 'react'

import type { User } from '../App'
import { UserContext, useUser } from '../store/UserStore'

interface SidebarProps {
 
}


export const Sidebar = ({}: SidebarProps) => {
  const user = useUser()

  return (
    <div>
      <div>{user.name}</div>
      <div>Subscribe: {user.isSubscribed.valueOf().toString()}</div>
    </div>
  )
}
