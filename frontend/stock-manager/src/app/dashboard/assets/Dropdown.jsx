'use client'
import {  CaretUp, SignOut, UserCircle, Users } from 'phosphor-react'
import {  Dropdown } from 'keep-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter} from 'next/navigation'

export const DropdownComponent = () => {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('user logged out succesfully, redircting to login');
    router.push('/');
  }

  return (
    <DropdownMenu className="p-12" >
      <DropdownMenuTrigger>
        <CaretUp />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="side-top-class">
        <DropdownMenuItem  className='cursor-pointer' onClick={handleLogout}>
          <SignOut className="mr-2 h-4 w-4" />
          <span className='font-semibold' >Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
