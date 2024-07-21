'use client'
import {  SignOut, UserCircle, Users } from 'phosphor-react'
import {  Dropdown } from 'keep-react'
import { useRouter} from 'next/navigation'

export const DropdownComponent = () => {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('user logged out succesfully, redircting to login');
    router.push('/');
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
