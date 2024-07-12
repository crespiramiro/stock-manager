import AuthGuard from "../components/AuthGuard";
import Maincontent from "./Maincontent";
import Slidebar from "./Slidebar";



export default function Dashboard() {
    return(
        <AuthGuard>
        <main className="min-h-screen w-full flex flex-row " >
            <Slidebar />
            <Maincontent />
        </main>
        </AuthGuard>
    )
}