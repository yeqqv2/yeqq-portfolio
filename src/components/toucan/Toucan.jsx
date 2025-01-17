import React from "react";
import "./toucan.css";

const Toucan = () => {
  return (
    <div className="container">
      <div className="head">
        <div className="start"></div>
        <div className="colorful"></div>
        <div className="eye"></div>
      </div>
      <div className="body">
        <div className="back"></div>
        <div className="neck"></div>
      </div>
      <div className="branch">
        <div className="bigLeaf"></div>
        <div className="smallLeaf"></div>
        <div className="stem"></div>
      </div>
      <div className="tail"></div>
    </div>
  );
};

export default Toucan;
