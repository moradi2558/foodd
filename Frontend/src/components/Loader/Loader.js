import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div
      className="tw-fixed top-0"
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "rgba(0,0,0,.2)",
        zIndex: "99999999",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%",
          top: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
