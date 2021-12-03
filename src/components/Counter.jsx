import React from "react";
import { Add, Remove } from "@material-ui/icons";
const Counter = ({ quantity,addHandler,subtractHandler,item }) => {
 
  return (
    <div className="flex items-center  text-white text-center">
      <div
        onClick={()=>addHandler(item,quantity)}
        className="bg-secondary hover:bg-primary mr-3 w-16 h-10 rounded-xl inline-flex place-items-center justify-center"
      >
        <Add />
      </div>
      <div className="w-16 text-lg font-bold h-10 border-2 mr-3   border-secondary rounded-xl text-primary inline-flex place-items-center justify-center">
        {quantity}
      </div>
      <div
        onClick={()=>subtractHandler(item,quantity)}
        className="bg-secondary mr-3 hover:bg-primary text-white w-16 h-10 inline-flex place-items-center justify-center rounded-xl"
      >
        <Remove />
      </div>
    </div>
  );
};

export default Counter;
