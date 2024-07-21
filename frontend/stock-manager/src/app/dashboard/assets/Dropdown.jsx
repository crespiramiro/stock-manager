'use client'
import { ChartPieSlice, Copy, Pen, Phone, SignOut, UserCircle, Users } from 'phosphor-react'
import { Divider, Dropdown } from 'keep-react'

export const DropdownComponent = () => {
  
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    console.log('user logged out succesfully, redircting to login');
    window.location.href = '/';
  }

  return (
    <Dropdown>
        <Dropdown.Item onClick={handleLogout} >
          <SignOut size={20} />
          Logout
        </Dropdown.Item>
    </Dropdown>
  )
}
