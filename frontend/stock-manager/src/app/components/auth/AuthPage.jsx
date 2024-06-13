'use client'

import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function AuthPage() {
    const [showLogin, setShowLogin] = useState(false);

    const handleSuccessRegistration = () => {
        setShowLogin(true);
    };

    return (
        <section className="flex w-screen">
            <section className="w-[45%] bg-black">
                {/* Aquí puedes agregar la animación si es necesario */}
            </section>
            <section className="w-[55%] flex flex-col items-center justify-center bg-white px-16 ">
                <button
                    className="absolute top-8 right-16 py-2 px-3 font-medium rounded-md"
                    onClick={() => setShowLogin(!showLogin)}
                >
                    {showLogin ? 'Sign Up' : 'Log In'}
                </button>
                {showLogin ? <LoginForm /> : <RegisterForm onSuccess={handleSuccessRegistration} />}
            </section>
        </section>
    );
}


// import RegisterForm from "./RegisterForm"

// export default function Register () {
//     return (  
//           <section className="flex w-screen">
//       {/* Sección izquierda con el fondo negro y la animación */}
//       <section className="w-[45%] bg-black">
//         {/* Aquí puedes agregar la animación si es necesario */}
//       </section>
//        {/* Sección derecha con el formulario de registro */}
//        <section className="w-[55%] flex flex-col items-center justify-center bg-white px-16 ">
//        <button className="absolute top-8 right-16  py-2 px-3  font-medium rounded-md">Log in</button>
//         <RegisterForm />
//       </section>
//     </section>
//     )
// };
