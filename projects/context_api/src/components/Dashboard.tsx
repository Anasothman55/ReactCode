import React from 'react'
import type { User } from '../App'
import { Sidebar } from './Sidebar'
import { Profile } from './Profile'

interface DashboardProps {
  
}

export const Dashboard = ({}: DashboardProps) => {
  return (
    <div>
      <Sidebar />
      <Profile />
    </div>
  )
}
