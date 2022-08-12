import React from "react";

export default function ComputerTile(props) {
  let shipTypeHover;
  if (props.isShot === true) {
    shipTypeHover = "tileface ship shot";
  } else if (props.isMissed === true) {
    shipTypeHover = "tileface ship miss";
  } else {
    shipTypeHover = "tileface";
  }
  return <div onClick={props.onClick} className={shipTypeHover}></div>;
}
