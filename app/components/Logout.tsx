"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/store/features/auth/authSlice";
import { apiFetch } from "../lib/api";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    dispatch(clearCredentials());
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-xl"
    >
      Logout
    </button>
  );
}