import React from 'react'

const Input = ({label,  placeholder, onChange, type="text"}) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-indigo-500 transition"
        /> 
    </>
  )
}

export default Input