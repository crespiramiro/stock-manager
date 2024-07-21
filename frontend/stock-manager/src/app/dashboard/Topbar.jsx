'use client'
import { DropdownComponent } from "./assets/Dropdown";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function Topbar () {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            console.log('DECODED TOKEN', decodedToken);
            setUserName(decodedToken.userName); 
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, []);
    

    return (
       
            <section className="flex flex-row items-center justify-end pr-16 py-4 gap-x-48 " >
               <div className="items-center" >
               </div>
               <div className="flex flex-row items-center gap-x-6  " >
               <h2>Hi, {userName || 'User'}</h2>
                <DropdownComponent/>
               </div>
            </section>

    )

}