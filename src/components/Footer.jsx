import React,{useState} from "react";
import logo from "../assets/logo.png";
import Uk from "../assets/Uk.png";
import Nig from "../assets/Nigeria.png";
import Modal from './Modal'
const Footer = () => {

  const [open, setOpen] = useState(false);
  const [no1] = useState("+2348136181659");
  const [no2] = useState("+447588067218");
  const handleOpen=()=>{
    setOpen(true)
  }
  return (
    <div className="relative bottom-0 left-0 z-0 w-full">
      {" "}
      <div className="border-2 border-gray-200" />
      <div className="flex px-2 md:px-16 my-6 items-center">
        <img className="h-16 w-auto sm:h-20" src={logo} alt="" />
        <div className="text-xs md:text-base ml-2 sm:ml-6  font-medium w-full">
          <div className="inline-flex flex-wrap w-full">
            {" "}
            You can contact our Nigeria vendor
            <span onClick={handleOpen} className="group-hover:animate-pulse cursor-pointer">
              <img src={Nig} alt="" className="mx-1 sm:mx-3 h-4 sm:h-6" />
            </span>
             or our UK vendor
            <span onClick={handleOpen} className="group-hover:animate-pulse cursor-pointer">
              <img src={Uk} alt="" className="mx-1 sm:mx-3 h-4 sm:h-6 group" />
            </span>{" "}
           
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        no1={no1}
        no2={no2}
        message={'Hello, I just got off your website and I..'}
      />
    </div>
  );
};

export default Footer;
