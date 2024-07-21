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
            <section className="md:w-[45%] w-0 bg-black">
                {/* Aquí puedes agregar la animación si es necesario */}
            </section>
            <section className="md:w-[55%] w-screen flex flex-col items-center justify-center bg-white px-16 ">
                <button
                    className="absolute top-8 right-16 py-2 px-3 font-medium rounded-md"
                    onClick={() => setShowLogin(!showLogin)}
                >
                    {showLogin ? 'Sign Up' : 'Log In'}
                </button>
                {showLogin ? <LoginForm onSuccess={handleSuccessRegistration} /> : <RegisterForm onSuccess={handleSuccessRegistration} />}
            </section>
        </section>
    );
}