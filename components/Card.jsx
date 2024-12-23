"use client";

import {
  Box,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useContext, useState } from "react";
import CryptoMarketData from "./MarketValue";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { RestaurantContext } from "@context/RestaurantContext";
import ErrorIcon from "@mui/icons-material/Error";
import TableComponent from "./Table";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "@node_modules/axios";

const Card = ({ title, type, deposits }) => {
  const {
    myWallet,
    formatMoney,
    setPlan,
    setCoin,
    setAmount,
    setIndex,
    coin,
    amount,
    formatDateToReadable,
  } = useContext(RestaurantContext);
  const [active, setActive] = useState("beginner");
  const [crypto, setCrypto] = useState("bitcoin");
  const [walletAddress, setWalletAddress] = useState("");
  const [amountW, setAmountW] = useState("");
  const [loading, setLoading] = useState(false);
  const getColor = (status) => {
    if (status === "success") {
      return "green";
    }
    if (status === "pending") {
      return "orange";
    }
    if (status === "rejected") {
      return "red";
    }
  };
  let data = [];
  deposits &&
    deposits.map((order) =>
      data.push([
        <Typography className="text-green-300">
          {formatMoney(order?.amount)}
        </Typography>,
        <Typography className="text-red-300">
          {formatMoney(order?.interest)}
        </Typography>,
        order?.coin,
        order?.plan,
        <div
          style={{
            color: getColor(order?.status),
          }}
        >
          {order?.status}
        </div>,
        formatDateToReadable(order?.createdAt),
      ])
    );
  const columns = [
    "Amount",
    "interest",
    "Coin",
    "Plan",
    "Status",
    "Created At",
  ];

  const handleWithdrawalRequest = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/deposit/create-withdrawal/", {
        amount: amountW,
        walletAddress: walletAddress,
        coin: crypto,
      });
      toast.success("Withdrawal Submited", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
      setAmountW("");
      setWalletAddress("");
      setCrypto("");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (type === "investment")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              height: "55vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              flexDirection: "column",
            }}
          >
            <Box
              onClick={() => {
                setActive("beginner");
                setPlan("beginner");
              }}
              sx={{
                border: `0.1px solid ${
                  active === "beginner" ? "#00ACAC" : "white"
                }`,
              }}
              className=" rounded-xl mt-4 p-2 bg-[#2A2A4C] cursor-pointer"
            >
              <Typography className="text-white text-center ">
                Beginner
              </Typography>
              <Typography className="text-white text-center ">
                Referal Bonus 5%
              </Typography>
              <Typography className="text-white text-center ">
                Cancel at anytime
              </Typography>
            </Box>
            <Stack
              direction="row"
              className="mt-3"
              justifyContent="space-between"
            >
              <Box
                onClick={() => {
                  setActive("pro");
                  setPlan("pro");
                }}
                sx={{
                  border: `0.1px solid ${
                    active === "pro" ? "#00ACAC" : "white"
                  }`,
                }}
                className="rounded-xl p-2 bg-[#2A2A4C] mr-1 cursor-pointer"
              >
                <Typography className="text-white text-center ">PRO</Typography>
                <Typography className="text-white text-center ">
                  Referal Bonus 9%
                </Typography>
                <Typography className="text-white text-center ">
                  Cancel at anytime
                </Typography>
              </Box>{" "}
              <Box
                onClick={() => {
                  setActive("ultimate");
                  setPlan("ultimate");
                }}
                sx={{
                  border: `0.1px solid ${
                    active === "ultimate" ? "#00ACAC" : "white"
                  }`,
                }}
                className="rounded-xl p-2 bg-[#2A2A4C] ml-1 cursor-pointer"
              >
                <Typography className="text-white text-center ">
                  Ultimate
                </Typography>
                <Typography className="text-white text-center ">
                  Referal Bonus 13%
                </Typography>
                <Typography className="text-white text-center ">
                  Cancel at anytime
                </Typography>
              </Box>{" "}
            </Stack>
          </Box>
        </Box>
      </Box>
    );
  if (type === "payment")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
            sx={{
              width: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ height: "55vh", width: "100%" }}>
              <Box sx={{ width: "100%" }} className="mt-3">
                <select
                  style={{ width: "100%", background: "#4D4D6C" }}
                  className="rounded-2xl text-white py-3 text-sm px-2"
                  value={coin}
                  onChange={(e) => setCoin(e.target.value)}
                >
                  <option value="bitcoin">Bitcoin</option>
                  <option value="litecoin">Litecoin </option>
                  <option value="dogecoin">Dogecoin </option>
                  <option value="ethereum">Ethereum </option>
                  <option value="bitcoin-cash">Bitcoin Cash </option>
                  <option value="dash">Dash </option>
                  <option value="usdt-trc20">USDT TRC20 </option>
                  <option value="tron">Tron </option>
                  <option value="usd-erc20">USDT ERC20 </option>
                </select>
              </Box>

              <Box className="mt-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#4D4D6C",
                  }}
                  className="rounded-2xl text-white py-2 px-1"
                >
                  <Typography className="text-white">$</Typography>
                  <input
                    className="py-1"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: "100%", background: "transparent" }}
                    placeholder="Enter amount 10 - 250000"
                  />
                </div>
              </Box>

              <button
                style={{ background: "#01CACA" }}
                onClick={() => {
                  if (!amount) {
                    toast.error("Deposit Amount is required", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                    return;
                  } else {
                    if (amount < 10) {
                      toast.error("Invald Deposit Amount", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                      });
                      return;
                    }
                  }
                  setIndex(1);
                }}
                className="mt-4 rounded-2xl bg-[]-600 py-2 w-[100%] text-white"
              >
                Make a Deposit
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  if (type === "market")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
            sx={{
              width: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CryptoMarketData />
          </Box>
        </Box>
      </Box>
    );
  if (type === "balance")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
            sx={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box className="h-[20%]">
              <IconButton>
                <MonetizationOnIcon
                  className="text-white"
                  sx={{ width: 100, height: 100 }}
                />
              </IconButton>
            </Box>
            <Typography className="text-white text-sm text-center">
              Funds available for withdrawal, withdrawals would be charged from
              this balance.
            </Typography>
            <Typography className="text-white p-2 bg-black rounded-2xl mt-5 text-2xl">
              {formatMoney(myWallet?.balance) || 0.0}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  if (type === "withdrawal")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
            sx={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {myWallet?.balance === 0 && (
              <Box className="h-[20%]">
                <IconButton>
                  <ErrorIcon
                    className="text-white"
                    sx={{ width: 100, height: 100 }}
                  />
                </IconButton>
              </Box>
            )}
            {myWallet?.balance === 0 && (
              <Typography className="text-white text-sm text-center">
                No funds to withdraw. At least $10 balance is needed.
              </Typography>
            )}
            {myWallet?.balance !== 0 && (
              <Box sx={{ height: "100%", width: "100%" }}>
                <Box sx={{ width: "100%" }} className="mt-3">
                  <select
                    style={{ width: "100%", background: "#4D4D6C" }}
                    className="rounded-2xl text-white py-3 text-sm px-2"
                    value={crypto}
                    onChange={(e) => setCrypto(e.target.value)}
                  >
                    <option value="bitcoin">Bitcoin</option>
                    <option value="litecoin">Litecoin </option>
                    <option value="dogecoin">Dogecoin </option>
                    <option value="ethereum">Ethereum </option>
                    <option value="bitcoin-cash">Bitcoin Cash </option>
                    <option value="dash">Dash </option>
                    <option value="usdt-trc20">USDT TRC20 </option>
                    <option value="tron">Tron </option>
                    <option value="usd-erc20">USDT ERC20 </option>
                  </select>
                </Box>

                <Box className="mt-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#4D4D6C",
                    }}
                    className="rounded-2xl text-white py-2 px-1"
                  >
                    <input
                      className="py-1"
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      style={{ width: "100%", background: "transparent" }}
                      placeholder="Enter Your walletAddress"
                    />
                  </div>
                </Box>
                <Box className="mt-3">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#4D4D6C",
                    }}
                    className="rounded-2xl text-white py-2 px-1"
                  >
                    <Typography className="text-white">$</Typography>
                    <input
                      className="py-1"
                      type="number"
                      value={amountW}
                      onChange={(e) => setAmountW(e.target.value)}
                      style={{ width: "100%", background: "transparent" }}
                      placeholder="Enter amount 10 - 250000"
                    />
                  </div>
                </Box>

                <button
                  style={{ background: "#01CACA" }}
                  onClick={() => {
                    if (!amountW) {
                      toast.error("Deposit Amount is required", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                      });
                      return;
                    } else {
                      if (amountW < 10) {
                        toast.error("Invald Deposit Amount", {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          transition: Bounce,
                        });
                        return;
                      }
                    }
                    handleWithdrawalRequest();
                  }}
                  className="mt-4 rounded-2xl bg-[]-600 py-2 w-[100%] text-white"
                >
                  {loading ? (
                    <CircularProgress sx={{ color: "white" }} size={15} />
                  ) : (
                    "Withdraw"
                  )}
                </button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  if (type === "deposit")
    return (
      <Box
        className="rounded-xl"
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        <Box>
          <Typography
            className="rounded-xl"
            style={{
              textAlign: "center",
              color: "white",
              background: "black",
            }}
          >
            {title}
          </Typography>
          <Box
            className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
            sx={{
              width: "100%%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TableComponent data={data} columns={columns} />
          </Box>
        </Box>
      </Box>
    );
};

export default Card;
