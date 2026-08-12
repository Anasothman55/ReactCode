
import React from 'react'
import { logo } from '../assets'
import { Button } from './ui/Button'

export const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="logo"/>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly >{"Cart (0)"}</Button>
      </nav>
    </header>
  )
}
