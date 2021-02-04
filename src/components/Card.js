import React from "react";

const Card = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        width: "250px",
        borderStyle: "solid",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
          borderRight: "solid",
        }}
      >
        Sprite
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "solid",
          }}
        >
          Name
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Types
        </div>
      </div>
    </div>
  );
};

export default Card;
