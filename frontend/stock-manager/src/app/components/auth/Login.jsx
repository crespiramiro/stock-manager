import LoginForm from "./LoginForm"
export default function Login() {

    return(
        <section className="flex w-screen">
        {/* Sección izquierda con el fondo negro y la animación */}
        <section className="w-[45%] bg-black">
          {/* Aquí puedes agregar la animación si es necesario */}
        </section>
         {/* Sección derecha con el formulario de registro */}
         <section className="w-[55%] flex flex-col items-center justify-center bg-white px-16 ">
         <button className="absolute top-8 right-16  py-2 px-3  font-medium rounded-md">Sign Up</button>
          <LoginForm/>
        </section>
      </section>
    )
};