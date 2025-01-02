import React from "react";

const TableComponent = () => {
  const data = [
    {
      ip: "102.90.45.157",
      device: "Windows 10",
      location: "NG",
      city: "Enugu-Ukwu",
      browser: "Chrome",
    },
    {
      ip: "197.210.54.223",
      device: "Windows 10",
      location: "NG",
      city: "Abuja",
      browser: "Chrome",
    },
    {
      ip: "197.210.54.223",
      device: "Windows 10",
      location: "NG",
      city: "Abuja",
      browser: "Chrome",
    },
    {
      ip: "102.90.103.189",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "197.210.85.139",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "102.90.44.192",
      device: "Windows 10",
      location: "NG",
      city: "Enugu-Ukwu",
      browser: "Chrome",
    },
    {
      ip: "102.90.101.244",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "197.210.55.214",
      device: "Windows 10",
      location: "NG",
      city: "Abuja",
      browser: "Chrome",
    },
    {
      ip: "102.90.100.68",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "102.90.100.68",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "197.210.78.85",
      device: "Windows 10",
      location: "NG",
      city: "Abuja",
      browser: "Chrome",
    },
    {
      ip: "102.90.102.133",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "102.90.102.207",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "105.116.7.196",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "105.113.41.170",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "197.210.226.97",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "102.90.43.121",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "102.90.101.1",
      device: "Windows 10",
      location: "NG",
      city: "Port Harcourt",
      browser: "Chrome",
    },
    {
      ip: "197.210.55.217",
      device: "Windows 10",
      location: "NG",
      city: "Abuja",
      browser: "Chrome",
    },
  ];

  return (
    <div className=" text-white p-4 min-h-screen">
      <h1 className="text-lg font-bold mb-4 text-start">Login Hisory</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse bg-gray-800  ">
          <thead>
            <tr className=" text-gray-300">
              <th className="px-2 py-2 text-left">IP Address</th>
              <th className="px-2 py-2 text-left">Device</th>
              <th className="px-2 py-2 text-left">Location</th>
              <th className="px-2 py-2 text-left">City</th>
              <th className="px-2 py-2 text-left">Browser</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-600 transition duration-150"
              >
                <td className="px-2 py-2">{row.ip}</td>
                <td className="px-2 py-2">{row.device}</td>
                <td className="px-2 py-2">{row.location}</td>
                <td className="px-2 py-2">{row.city}</td>
                <td className="px-2 py-2">{row.browser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
