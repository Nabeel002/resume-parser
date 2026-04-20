"use client"
import Input from "../components/Input";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_END_POINT);
    
  
  }
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-black px-6 lg:px-8">
      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-zinc-800">
        
        <h2 className="text-center text-2xl font-bold text-white mb-8">
          Sign in to your account 
        </h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <Input label="Email address" placeholder="Enter your email" type="email" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} />
          </div>

          <div>
            <Input label="Password" placeholder="Enter your password" type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {setPassword(e.target.value)}} />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-black hover:bg-gray-200 transition cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-white hover:text-gray-300 font-semibold"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;