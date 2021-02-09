import React from "react";
import { typeColor } from "../config/color";

const PokeType = (props) => {
  return (
    <div
      style={
        props.mb
          ? { ...mType, backgroundColor: typeColor[props.colorName] }
          : { ...dType, backgroundColor: typeColor[props.colorName] }
      }
    >
      {props.mb ? null : props.children}
    </div>
  );
};

const mType = {
  width: "30px",
  height: "30px",
  borderRadius: "50px",
  margin: "5px",
};

const dType = {
  width: "80px",
  height: "25px",
  borderRadius: "10px",
  color: "white",
  fontWeight: "700",
  fontSize: "12px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  margin: "5px",
};

export default PokeType;
