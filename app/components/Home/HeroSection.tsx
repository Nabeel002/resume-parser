
import Link from 'next/link'
export const HeroSection = () => {
  return (
    <>
        <section className="bg-black text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12  gap-12 items-center">

        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center">
            Build Your Resume <br />
            <span className="text-gray-400">in Minutes with AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl text-center">
            Paste a job description and instantly generate an ATS-friendly resume tailored to land interviews.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">   
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
              Get Started Free
            </button>
            </Link>
            <Link href="/example">
            <button className="border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer">
              See Example
            </button>
            </Link>
          </div>
        </div>

       

      </div>
    </section>
    </>
  )
}
