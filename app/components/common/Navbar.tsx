import { cookies } from "next/headers";
import LogoutButton from "../Logout";

async function getUser() {
  const cookieStore = await cookies();
  const apiEndPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const response = await fetch(
    `${apiEndPoint}/api/user/profile`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );

  if (!response.ok) return null;

  const data = await response.json();


  return data.user;
}




export default async function Navbar() {
  const user = await getUser();

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