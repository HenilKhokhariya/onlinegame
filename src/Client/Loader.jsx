import React from "react";

export default function Loader({ loader }) {
  return (
    <div className={`loader-box ${loader ? "" : "invisible"}`}>
      <img src={require("../Image/Loader/285.gif")} />
    </div>
  );
}
