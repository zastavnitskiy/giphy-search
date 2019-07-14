import React from "react";
import "./Status.css";

export const Status: React.FC = ({ children }) => {
  if (!children) {
    return null;
  }
  return <div className="status">{children}</div>;
};
