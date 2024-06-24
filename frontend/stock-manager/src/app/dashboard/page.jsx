import Maincontent from "./Maincontent";
import Slidebar from "./Slidebar";



export default function Dashboard() {
    return(
        <main className="min-h-screen w-full flex flex-row " >
            <Slidebar />
            <Maincontent />
        </main>
    )
}