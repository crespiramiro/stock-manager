import AuthGuard from "./components/AuthGuard";
import AuthPage from "./components/auth/AuthPage";



export default function Home() {
  return (
    <main className="flex min-h-screen w-screen " >
         <AuthPage /> 
    </main>
  );
}
