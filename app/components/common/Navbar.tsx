"use client";

import { useSelector } from "react-redux";
import LogoutButton from "../Logout";

export default function Navbar() {
  const user = useSelector((s: any) => s.auth.user);

  return (
    <header className="flex items-center justify-between px-6 py-4 mx-auto fixed top-0 bg-white z-50 shadow-sm w-full">
      <h1 className="text-xl font-bold tracking-tight">
        ResumeAI
      </h1>

      {user?.userName ? (
        <div className="flex items-center gap-4">
          <p>{user.userName}</p>
          <LogoutButton />
        </div>
      ) : (
        <button className="bg-black text-white px-5 py-2 rounded-xl">
          Sign In
        </button>
      )}
    </header>
  );
}