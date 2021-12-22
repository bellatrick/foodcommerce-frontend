import React from "react";
import logo from "../assets/blue.png";
// import Uk from "../assets/Uk.png";
// import Nig from "../assets/Nigeria.png";
const Footer = () => {
  return (
    <div className="relative bottom-0 left-0 z-0 w-full">
      {" "}
      <div className="border-2 border-gray-200" />
      <div className="flex px-2 md:px-16 my-6 items-center">
        <img className="h-16 w-auto sm:h-20" src={logo} alt="" />
        <div className="text-xs md:text-base ml-2 sm:ml-6  font-medium w-full">
          <div className="inline-flex w-full">
            {" "}
            You can contact us at
            {/* <span>
              <img src={Nig} alt="" className="mx-1 sm:mx-3 h-4 sm:h-6" />
            </span> */}
            +2348136181659 or{" "}
            {/* <span>
              <img src={Uk} alt="" className="mx-1 sm:mx-3 h-4 sm:h-6" />
            </span>{" "} */}
            +447588067218
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
