import React from 'react'
type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label = "text",
  placeholder = "text",
  onChange,
  type = "text",
  value
}: InputProps) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className="mt-2 w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-indigo-500 transition"
        /> 
    </>
  )
}

export default Input