import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#161722",
      }}
    >
      <CircularProgress className="text-gray-400" />
    </div>
  );
};

export default loading;
