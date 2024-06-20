import Slidebar from "./Slidebar";
import Topbar from "./Topbar";


export default function Dashboard() {
    return(
        <main className="min-h-screen w-full flex flex-row " >
            <Slidebar />
            <Topbar />
        </main>
    )
}