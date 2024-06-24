import Slidebar from "../dashboard/Slidebar"
import { TableComponent } from "./TableComponent"
export default function Inventory() {

    return( 
        
        <main className="min-h-screen w-full flex flex-row " >
            <Slidebar />
            <section className="content w-full h-full  px-12 mt-4 scroll ">
            <TableComponent/>
            </section>
        </main>

    )
};