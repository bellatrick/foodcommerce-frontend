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
export default function Textarea({onChange,value}) {
    return (
      <div className='m-3 '>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 sr-only">
          Add your Message
        </label>
        <div className="mt-1">
          <textarea
            rows={8}
            name="message"
            id="comment"
            required
            placeholder='Enter your message here'
            onChange={onChange}
            value={value}
            className="shadow-sm  focus:ring-green-500 p-4 focus:border-green-500 block w-full sm:text-sm border border-gray-200 rounded-md"
       
          />
        </div>
      </div>
    )
  }
  