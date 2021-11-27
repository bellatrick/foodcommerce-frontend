/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function CustomInput({label, placeholder,type,name}) {
    return (
      <div className='mb-8'>
        <label htmlFor="email" className="sr-only">
         {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className="shadow-sm  focus:ring-indigo-500 py-3 px-5 focus:border-green-500 block w-full sm:text-sm border border-gray-200 rounded-md"
          placeholder={placeholder}
        />
      </div>
    )
  }
  