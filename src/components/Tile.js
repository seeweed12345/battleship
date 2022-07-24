import React from "react";

export default function Tile(props) {
  let shipTypeHover;
  if (props.isShipPlaced === true) {
    shipTypeHover = "tileface ship";
  } else {
    shipTypeHover = "tileface";
  }
  return <div onClick={props.onClick} className={shipTypeHover}></div>;
}

// when click switch axis, grid regenerates.
//when grid regenerates, every 10th square should have a unique class
