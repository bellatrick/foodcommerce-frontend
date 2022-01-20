import img9 from "../assets/img9.png";
import img12 from '../assets/img12.png'
import img7 from "../assets/img7.png";
import img3 from "../assets/img3.png";
import img10 from "../assets/img10.png";
import img6 from "../assets/img6.png";
import Carousel from "react-material-ui-carousel";
export default function HeaderSection() {
  const items = [
    {
      name: img12,
      title: "All You Need To Buy!",
    },
   
    {
      name: img7,
      title: "Groceries Shopping",
    },
    {
      name: img3,
      title: "Buy More, Pay Less!",
    },
    {
      name: img6,
      title: "All You Need In Your Wardrobe",
    },
    {
      name: img9,
      title: "For All Your Party Needs!",
    },
    {
      name: img10,
      title: "Buy Mobile Gadgets",
    },
  ];
  return (
    <div className="relative bg-primary">
      <Carousel
        autoPlay={true}
        navButtonsAlwaysInvisible={true}
        swipe={true}
        indicators={false}
        stopAutoPlayOnHover={true}
        interval={4000}
        animation={"slide"}
      >
        {items.map((item, i) => (
          <main
            key={i}
            className="lg:relative flex flex-col-reverse md:flex-row"
          >
            <div className=" mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
              <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <h1 className="text-3xl font-extrabold text-white sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl">
                  <span className="block xl:inline font-heading tracking-wider">
                    {item.title}
                  </span>{" "}
                </h1>
                <p className="mt-3 max-w-md mx-auto text-lg text-white sm:text-xl md:mt-5 md:max-w-3xl">
                We reduce your stress at a very good price by helping you with providing goods and rendering services.
                </p>
                <div className="mt-10 sm:flex sm:justify-center lg:justify-start px-16">
                  <div className="rounded-md shadow">
                    <a
                      href="#productlist"
                      className=" flex items-center justify-center  sm:px-16 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-secondary md:py-2 md:text-lg md:px-6"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-96 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                className="absolute inset-0 w-full h-full md:object-cover"
                src={item.name}
                alt="headerimg"
              />
            </div>
          </main>
        ))}
      </Carousel>
    </div>
  );
}
