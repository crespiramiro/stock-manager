'use client'
import { ChartPieSlice, Copy, Pen, Phone, SignOut, UserCircle, Users } from 'phosphor-react'
import { Divider, Dropdown } from 'keep-react'

export const DropdownComponent = () => {
  return (
    <Dropdown>
        <Dropdown.Item>
          <UserCircle size={20} />
          Account
        </Dropdown.Item>
        <Dropdown.Item>
          <SignOut size={20} />
          Logout
        </Dropdown.Item>
    </Dropdown>
  )
}
