import React from 'react'

const Button = (props: { handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void; isLoading: boolean; loaderTxt: string; text: string }) => {
  const { handleSubmit, isLoading, loaderTxt, text } = props;
  return (
    <>
     <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full rounded-lg py-2 text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-2
    ${isLoading ? "bg-gray-200 text-black cursor-not-allowed" : "bg-white text-black hover:bg-gray-200"}
  `}
          >
            {isLoading && <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>}

            {isLoading ? `${loaderTxt}...` : text}
          </button>
    </>
  )
}

export default Button