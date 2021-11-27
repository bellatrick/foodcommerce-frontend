import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
      <div className="border-2 border-gray-200" />
      <div className="flex px-8 md:px-16 my-6 items-center">
        <img
          className="h-8 w-auto sm:h-10"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
        />
        <p className="text-base ml-6 font-medium">
          You can contact us at storename@gmail.com or +2348108932678
        </p>
      </div>
    </div>
  );
};

export default Footer;