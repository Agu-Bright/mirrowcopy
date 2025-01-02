"use client";
import React, { useState } from "react";

const TwoFactorAuth = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`2FA OTP submitted: ${otp}`);
  };

  return (
    <div className="min-h-screen text-white flex flex-col justify-start items-center p-4">
      <div
        style={{ background: "#242731" }}
        className=" w-full  rounded-lg shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Two Factor Authentication
        </h1>
        <p className="text-gray-300 text-sm mb-6 text-center">
          Your account will be more secure if you use this feature. A 6-digit
          verification code from your Android Google Authenticator app must be
          entered whenever someone tries to log in to the account. Additionally,
          the payout procedure will require this verification.
        </p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Scan Code</h2>
          <p className="text-gray-400 text-sm mb-2">
            A 6-digit verification code from your Android Google Authenticator
            app must be entered whenever someone tries to log in to the account.
            Use the QR code or setup key on your Google Authenticator app to add
            your account.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Download 2FA App
          </a>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">
            Google Authenticator is a multifactor app for mobile devices. It
            generates timed codes used during the 2-step verification process.
          </p>
          <div className="bg-gray-700 text-gray-300 p-2 rounded-lg flex items-center justify-between">
            <span>MFA7UA0CII26K3YC</span>
            <button
              onClick={() => navigator.clipboard.writeText("MFA7UA0CII26K3YC")}
              className="text-blue-400 hover:text-blue-500"
            >
              Copy
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Enable 2FA Security
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Google Authenticator OTP"
              className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
