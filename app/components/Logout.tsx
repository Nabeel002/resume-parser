"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const handleLogout = async () => {
    await fetch(`${apiEndPoint}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.refresh();
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