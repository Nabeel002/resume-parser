export default function Navbar(){
    return (
     <header className="flex items-center justify-between px-6 py-4 mx-auto fixed top-0 bg-white z-50 shadow-sm w-full">
        <h1 className="text-xl font-bold tracking-tight">ResumeAI</h1>
        <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition cursor-pointer">
          Sign In
        </button>
      </header>
    )
}