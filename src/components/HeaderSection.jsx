
import headerimg from '../assets/headerimg.png'

export default function HeaderSection() {
  return (
    <div className="relative bg-primary">
      <main className="lg:relative flex flex-col-reverse md:flex-row">
        <div className=" mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-3xl font-extrabold text-white sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
              <span className="block xl:inline font-heading tracking-wider">All you need to buy</span>{' '}
             
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-white sm:text-xl md:mt-5 md:max-w-3xl">
              We are certified to deliver your products with lightening speed and at a reasonable price. 
             
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start px-16">
              <div className="rounded-md shadow">
                <p
                 
                  className=" flex items-center justify-center  sm:px-16 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 md:py-2 md:text-lg md:px-6"
                >
                  Shop Now
                </p>
              </div>
            
            </div>
          </div>
        </div>
        <div className="relative w-full h-96 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <img
            className="absolute inset-0 w-full h-full md:object-cover"
            src={headerimg}
            alt="headerimg"
          />
        </div>
      </main>
    </div>
  )
}
