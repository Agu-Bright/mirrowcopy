"use client";
import { Divider, IconButton } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { usePathname } from "next/navigation";
const TraderCard = ({ trader, setActive }) => {
  const pathname = usePathname();
  const root = pathname.split("/")[1];

  return (
    <div
      style={{ background: "#242731" }}
      className="w-full max-w-sm rounded-lg shadow "
    >
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-white dark:text-gray-400 bg-green-400 dark:hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          {trader?.status}
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full border border-gray-500 shadow-lg"
          src={trader?.image}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-white dark:text-white">
          {trader?.name}
        </h5>
        <h5 className="mb-1 text-xl font-medium text-white dark:text-white">
          Followers: {trader?.followers}
        </h5>
        <Divider />
        <h5 className="mb-1 text-start text-gray-50  w-[100%] pl-2 text-sm font-medium dark:text-white">
          Profit Rate: {trader?.profitRate}%
        </h5>
        <h5 className="mb-1 text-start text-gray-50  w-[100%] pl-2 text-sm font-medium dark:text-white">
          Risk Score: {trader?.riskScore}%
        </h5>
        <h5 className="mb-1 text-start text-gray-50  w-[100%] pl-2 text-sm font-medium dark:text-white">
          Confidence: {trader?.confidence}%
        </h5>

        <span className="text-sm text-gray-50 dark:text-gray-400">
          <IconButton>
            <LocationOnIcon sx={{ color: "white" }} />
          </IconButton>{" "}
          {trader?.location}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            onClick={() => (root === "user" ? setActive(trader) : undefined)}
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Profile{" "}
          </a>
          {root === "dashboard" && (
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-red-500 focus:outline-none bg-white rounded-lg border border-red-500 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Delete{" "}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraderCard;
