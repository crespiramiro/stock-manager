import { DropdownComponent } from "./assets/Dropdown";
import Searchbar from "./assets/Searchbar";

export default function Topbar () {

    return (

       
            <section className="flex flex-row items-center justify-end pr-16 py-4 gap-x-48 " >
               <div className="items-center" >
               <Searchbar/>
               </div>
               <div className="flex flex-row items-center gap-x-6  " >
               <h2>Hi, User</h2>
                <DropdownComponent/>
               </div>
            </section>

    )

}