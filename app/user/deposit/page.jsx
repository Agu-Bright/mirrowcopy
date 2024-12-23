"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import Card from "@components/Card";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { formatMoney } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState("");
  const [index, setIndex] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [adminWallet, setAdminWallets] = useState("");
  const [main, setMain] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleCopy = (address) => {
    // const referralCode = session?.user?.referalCode;
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);
        const { data } = await axios.get(`/api/get-admin-wallet`);
        setAdminWallets(data?.wallets);
        setFetching(false);
      } catch (error) {
        toast.error("Unable to fetch Wallet", {
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
        setFetching(false);
      }
    })();
  }, []);

  const handleContinue = () => {
    if (!coin || !amount) {
      toast.error("Coin and Amount are required", {
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

    const activeNetwork = adminWallet.find((item) => item.network === coin);
    console.log("activeNetwork", activeNetwork);
    setMain(activeNetwork);
    setIndex(2);
  };

  const handleSubmit = async () => {
    if (!transactionHash) {
      toast.error("Transaction Hash is Required", {
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
    try {
      setLoading(true);
      const { data } = await axios.post("/api/deposit/crypto-deposit/", {
        amount: amount,
        method: "crypto",
        network: main?.network,
        transactionHash: transactionHash,
        status: "pending",
        coin,
      });
      toast.success("Deposit Successful", {
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
      setIndex(1);
      setLoading(false);
      setTransactionHash("");
      setAmount("");
      setMain("");
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

  if (status === "loading") {
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
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100%" }}>
          <Stack direction="column" justifyContent="space-between">
            <Box className="flex align-middle ">
              <Image
                src="/img/check.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              {index === 1 && (
                <Typography className="text-white text-2xl">
                  Deposit Funds{" "}
                </Typography>
              )}
              {index === 2 && (
                <Typography className="text-white text-2xl">
                  Deposit Confirmation{" "}
                </Typography>
              )}
            </Box>
            <Box className="w-[100%] mt-4">
              {index === 1 && (
                <>
                  <Typography className="text-white text-center">
                    Add funds using our system's gateway. The deposited amount
                    will be credited to the deposit wallet. You'll just make
                    investments from this wallet.
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    className="mt-5"
                  >
                    <Button
                      startIcon={<ArrowBackIcon sx={{ color: "white" }} />}
                      className="text-white"
                      variant="contained"
                      sx={{ backgroundColor: "#3f3fc2 !important" }}
                    >
                      Deposit History
                    </Button>
                    <Button
                      onClick={() => router.push("/user/wallets")}
                      endIcon={
                        <AccountBalanceWalletIcon sx={{ color: "white" }} />
                      }
                      className="text-white"
                      sx={{ backgroundColor: "orange !important" }}
                    >
                      Connect Wallet
                    </Button>
                  </Stack>
                  <Divider
                    sx={{ border: "1px solid white" }}
                    className="my-5"
                  />
                </>
              )}

              <Box
                sx={{ background: "#242731" }}
                className="px-4 py-8 rounded-xl"
              >
                {index === 1 && adminWallet && (
                  <>
                    <Stack
                      direction={{ md: "row", xs: "column" }}
                      justifyContent="space-between"
                    >
                      <Box sx={{ width: { md: "40%", xs: "100%" } }}>
                        <Typography>Select Gateway</Typography>
                        <select
                          className="rounded-2xl text-white py-3 text-sm px-2 bg-black w-[100%]"
                          value={coin}
                          onChange={(e) => setCoin(e.target.value)}
                        >
                          <option value="">Select Network</option>

                          {adminWallet?.map((item) => (
                            <>
                              <option value={item?.network}>
                                {item?.network}
                              </option>
                            </>
                          ))}
                          {/* <option value="ethereum">Ethereum </option> */}
                        </select>
                      </Box>
                      <Box sx={{ width: { md: "40%", xs: "100%" } }}>
                        <Typography>Amount USD</Typography>
                        <input
                          className="py-3 bg-black text-white rounded-2xl"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          style={{ width: "100%" }}
                          placeholder="Enter amount 10 - 250000"
                        />
                      </Box>
                    </Stack>
                    <Button
                      onClick={() => handleContinue()}
                      className="text-white mt-3 py-3 px-3 rounded-2xl"
                      sx={{ backgroundColor: "#3f3fc2 !important", flex: "1" }}
                    >
                      Continue{" "}
                    </Button>
                  </>
                )}
                {index === 2 && (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <AccountBalanceWalletIcon className="text-white mr-2" />
                      <Typography>{coin} pay</Typography>
                    </Box>
                    <Typography className="text-white text-start mt-5 ">
                      You have requested {formatMoney(amount)}, please pay for
                      successful payment
                    </Typography>

                    <Typography
                      sx={{
                        cursor: "pointer",
                        border: "0.1px dotted gray",
                        borderRadius: "10px",
                        margin: "20px 0px",
                        padding: "10px 4px",
                      }}
                      onClick={() => handleCopy(main?.walletAddress)}
                    >
                      <span
                        style={{
                          background: "gray",
                          color: "white",
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                          height: "100%",
                          padding: "10px 4px",
                        }}
                      >
                        copy:
                      </span>
                      <span
                        style={{ padding: "10px 4px" }}
                        className="text-white ml-2 overflow-y-scroll"
                      >
                        {main?.walletAddress}
                      </span>
                    </Typography>
                    <Box sx={{ width: { md: "40%", xs: "100%" } }}>
                      <Typography>Transaction Hash</Typography>
                      <input
                        className="py-3 bg-black text-white rounded-2xl"
                        type="text"
                        value={transactionHash}
                        onChange={(e) => setTransactionHash(e.target.value)}
                        style={{ width: "100%" }}
                        placeholder="#"
                      />
                    </Box>

                    <Stack
                      direction={{ md: "row", xs: "column" }}
                      justifyContent="space-between"
                    ></Stack>
                    <Button
                      onClick={() => (!loading ? handleSubmit() : undefined)}
                      className="text-white mt-3 py-3 px-3 rounded-2xl"
                      sx={{ backgroundColor: "#3f3fc2 !important", flex: "1" }}
                    >
                      {loading ? (
                        <CircularProgress size={15} sx={{ color: "white" }} />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
