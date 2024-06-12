import Login from "./components/auth/Login";
import Register from "./components/auth/Register";



export default function Home() {
  return (
    <main className="flex min-h-screen w-screen " >
        {/* <Register /> */}
        <Login/>
    </main>
  );
}
