'use client'
import Link from "next/link"
import { ArrowLeft, List, UserCircle, CaretUp } from "phosphor-react"
import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { DropdownComponent } from "./assets/Dropdown"

export default function Slidebar (){

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.userName); 
            setUserEmail(decodedToken.userEmail)
          } catch (error) {
          }
        }
      }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className={`flex flex-col gap-y-12 h-screen ${isOpen ? 'w-1/2 md:w-[30%] ' : 'w-3/12 md:w-2/12 '} text-center bg-black text-[#f5f5f5] px-4 md:px-12 py-8 transition-all duration-300`}>
            <button className={`${isOpen ? 'self-end' : 'self-center' }`} onClick={toggleMenu}>
                    {isOpen ? <ArrowLeft size={32} /> : <List size={32} />}
                </button>
                <h2 className={`font-semibold ${isOpen ? 'text-xl md:text-3xl text-center self-center text-wrap ' : 'hidden'} py-4 px-8 `}>Stock Management</h2>
            <div className="flex flex-col h-full justify-between">
                <ul className={`flex flex-col font-semibold gap-y-8 ${isOpen ? 'items-center' : 'items-center'}`}>
                    <Link href={"/dashboard"} className={`${isOpen ? 'text-xl' : 'hidden'} hover:cursor-pointer`}>Home</Link>
                    <Link href={"/inventory"} className={`${isOpen ? 'text-xl' : 'hidden'} hover:cursor-pointer`}>Inventory</Link>
                </ul>
               <div className="flex flex-row items-center justify-start gap-x-4 " >
               <UserCircle size={44} color="#ffffff" />
               <div className={`${isOpen ? 'flex flex-col items-start justify-center' : 'hidden'}`}>
               <h2 className="font-semibold text-lg " >Hi, {userName || 'User'}</h2>
               <h3 className=" text-md text-gray-500" >{userEmail || 'Mail' }</h3>
               </div>
               <DropdownComponent />
               </div>
            </div>
        </section>

    )

}