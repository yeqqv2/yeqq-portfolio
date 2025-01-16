import React from "react";
import "./toggle.css";

const Toggle = () => {
  return (
    <label className="label">
      <div className="toggle">
        <input
          className="toggle-state"
          type="checkbox"
          name="check"
          defaultValue="check"
        />
        <div className="indicator" />
      </div>
    </label>
  );
};

export default Toggle;
