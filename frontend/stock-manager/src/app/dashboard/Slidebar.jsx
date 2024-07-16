'use client'

export default function Slidebar (){

    const handleInventory = () => {
        window.location.href='/inventory'
    }

    const handleHome = () => {
        window.location.href='/'
    }

    return (

        <section className="flex flex-col gap-y-12 h-screen w-3/12 bg-black text-[#f5f5f5] px-12 py-8  " >
            <h2 className="font-bold text-4xl  p-4 self-center " >Stock Management</h2>
            <div className=" flex flex-col h-full justify-between " >
                <ul className="flex flex-col font-semibold gap-y-8 items-start px-4 " >
                    <li className="text-2xl hover:cursor-pointer "  onClick={handleHome} >Home</li>
                    <li className="text-2xl hover:cursor-pointer " onClick={handleInventory} >Inventory</li>
                </ul>
                <ul className="flex flex-col font-semibold items-start px-4 py-8" >
                <li className="text-2xl" >Help</li>
                </ul>
            </div>
        </section>

    )

}