import React from "react";
import { Icon } from "@iconify/react";
import signOut from "@iconify/icons-bytesize/sign-out";
import { colors } from "../config/color";

const ReleaseButton = (props) => {
  return (
    <button
      alt={"release pokemon"}
      style={icLeave}
      onClick={() => {
        props.clickHandler();
      }}
    >
      <Icon icon={signOut} style={{ fontSize: props.size }} />
    </button>
  );
};

const icLeave = {
  width: "30px",
  height: "30px",
  color: "white",
  background: colors.navbar,
  borderRadius: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default ReleaseButton;
