import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className='p-5'>
        <Outlet />
      </main>
      
      
    </div>
  )
}
