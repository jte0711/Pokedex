import React from "react";
import { typeColor } from "../config/color";

const PokeType = (props) => {
  return (
    <div
      style={{
        width: "80px",
        height: "25px",
        borderRadius: "10px",
        backgroundColor: typeColor[props.colorName],
        color: "white",
        fontWeight: "700",
        fontSize: "12px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "5px",
      }}
    >
      {props.children}
    </div>
  );
};

export default PokeType;
