export default function RegisterForm() {
    return (
        <form className="p-8 flex flex-col ">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <div className="mb-4">
        <label htmlFor="username" className=" text-sm font-medium text-gray-700">Username</label>
        <input type="text" placeholder="enter your username" id="username" name="username" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className=" text-sm font-medium text-gray-700">Email</label>
        <input type="email" placeholder="enter youre email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className=" text-sm font-medium text-gray-700">Password</label>
        <input type="password" placeholder="enter your password" id="password" name="password" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Sign Up</button>
      </form>
      );
};

