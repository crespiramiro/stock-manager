'use client'
import { ArrowLeft, List } from "phosphor-react"
import { useState } from "react"

export default function Slidebar (){

    const handleInventory = () => {
        window.location.href='/inventory'
    }

    const handleHome = () => {
        window.location.href='/'
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className={`flex flex-col gap-y-12 h-screen ${isOpen ? 'w-1/2 md:w-[30%] ' : 'w-3/12 md:w-2/12 '} text-center bg-black text-[#f5f5f5] px-4 md:px-12 py-8 transition-all duration-300`}>
            <button className={`${isOpen ? 'self-end' : 'self-center' }`} onClick={toggleMenu}>
                    {isOpen ? <ArrowLeft size={32} /> : <List size={32} />}
                </button>
                <h2 className={`font-semibold ${isOpen ? 'text-2xl md:text-4xl text-center self-center text-wrap ' : 'hidden'} py-4 px-8 `}>Stock Management</h2>
            <div className="flex flex-col h-full justify-between">
                <ul className={`flex flex-col font-semibold gap-y-8 ${isOpen ? 'items-center' : 'items-center'}`}>
                    <li className={`${isOpen ? 'text-2xl' : 'hidden'} hover:cursor-pointer`} onClick={handleHome}>Home</li>
                    <li className={`${isOpen ? 'text-2xl' : 'hidden'} hover:cursor-pointer`} onClick={handleInventory}>Inventory</li>
                </ul>
                <ul className={`flex flex-col font-semibold ${isOpen ? 'items-center' : 'items-center'} py-8`}>
                    <li className={`${isOpen ? 'text-2xl' : 'hidden'}`}>Help</li>
                </ul>
            </div>
        </section>

    )

}