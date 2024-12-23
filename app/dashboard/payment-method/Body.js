"use client";

import Sidebar from "@components/Sidebar";
import { IconButton, Paper } from "@mui/material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import WalletModal from "./Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { RestaurantContext } from "@context/RestaurantContext";
import SettingsIcon from "@mui/icons-material/Settings";

const Body = () => {
  const { data: session } = useSession();
  const [isWalletSet, setIsWalletSet] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [adminWallets, setAdminWallets] = useState([]);
  const [wallet, setWallet] = useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(null);
  const handleOpen = () => setOpen(true);
  const [state, setState] = useState(false);
  const { setType2 } = useContext(RestaurantContext);
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/get-rate");
        setRate(data?.rate);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/get-admin-wallet`);
        setAdminWallets(data?.wallets);
        setIsWalletSet(data?.wallets.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      }
    })();
  }, [state]);

  const handleUpdateWalletAddress = async () => {
    if (!wallet && !walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
    if (!wallet) {
      toast.error("Wallet Address and Network Type is required", {
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
    if (!walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-upload-wallet`, {
        wallet,
        walletAddress,
      });

      setSubmiting(false);
      setState((prev) => !prev);
      toast.success("Success", {
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
    } catch (error) {
      console.log(error);
      setSubmiting(false);
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
  const handleCreateWallet = async () => {
    if (!wallet && !walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
    if (!wallet) {
      toast.error("Wallet Address and Network Type is required", {
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
    if (!walletAddress) {
      toast.error("Wallet Address and Network Type is required", {
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
      setSubmiting(true);
      const { data } = await axios.post(`/api/admin-create-wallet`, {
        wallet,
        walletAddress,
      });
      if (data?.success) {
        toast.success("Success", {
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
        setState((prev) => !prev);
        setWallet("");
        setWalletAddress("");
      }
      setSubmiting(false);
    } catch (error) {
      console.log(error);
      setSubmiting(false);
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
  return (
    <Box sx={{ height: "100%", paddingBottom: "15px" }}>
      <div>
        <div>
          <div>
            <div>
              <>
                <div className="dashboard-header clearfix">
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography className="text-white">
                        Hi &#x1F44B;, {session?.user?.accountName}{" "}
                        {session?.user?.role === "admin" && (
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Admin
                          </span>
                        )}{" "}
                      </Typography>
                    </Box>
                  </Stack>
                </div>
                <div
                  className="container"
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background:
                      "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                  }}
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="space-between"
                  >
                    {adminWallets &&
                      adminWallets.length > 0 &&
                      adminWallets.map((item, index) => {
                        return (
                          <Paper
                            key={index}
                            //   onClick={() => setActive("trc")}
                            sx={{
                              width: "100%",
                              alignContent: "center",
                              padding: "10px",
                            }}
                          >
                            <Typography sx={{ color: "gray" }}>
                              Wallet Address:{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                  border: "0.1px dotted gray",
                                  borderRadius: "10px",
                                  padding: "2px",
                                }}
                                onClick={() => handleCopy(item?.walletAddress)}
                              >
                                {item?.walletAddress}
                              </span>
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                              Network: {item?.network}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                setActive(item);
                                setType2("update");
                                handleOpen();
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setActive(item);
                                setType2("delete");
                                handleOpen();
                              }}
                            >
                              <DeleteIcon sx={{ color: "red" }} />
                            </IconButton>
                          </Paper>
                        );
                      })}
                  </Stack>

                  <div className="row mt-5">
                    <Typography sx={{ color: "white", paddingLeft: "10px" }}>
                      Create Wallet Address
                    </Typography>
                    <div className="col-lg-12">
                      <div className="form-group" style={{ marginTop: "10px" }}>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="walletAddress"
                          className="input-text"
                          placeholder="Wallet Address"
                          onChange={(e) => setWalletAddress(e.target.value)}
                          value={walletAddress}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          style={{
                            width: "100%",
                            border: "1px solid #beb8b8",
                            height: "50px",
                          }}
                          name="sex"
                          className="input-text"
                          onChange={(e) => setWallet(e.target.value)}
                          value={wallet}
                        >
                          <option value=""> Choose Network</option>
                          <option value="trc20">TRC20</option>
                          <option value="erc20">ERC20</option>
                          <option value="bep20">BEP20</option>
                          <option value="bitcoin">Bitcoin</option>
                          <option value="litecoin">Litecoin</option>
                          <option value="dogecoin">Dogecoin</option>
                          <option value="ethereum">Ethereum</option>
                          <option value="bitcoin-cash">BitcoinCash</option>
                          <option value="dash">Dash</option>
                        </select>
                      </div>
                      <>
                        <button
                          onClick={handleCreateWallet}
                          className="btn-md btn-block"
                          disabled={submiting}
                          style={{ background: "#01CACA" }}
                        >
                          {submiting ? (
                            <CircularProgress
                              size={20}
                              sx={{ color: "white" }}
                            />
                          ) : (
                            "Create Address"
                          )}
                        </button>
                      </>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <WalletModal
        open={open}
        setOpen={setOpen}
        activeWallet={active}
        setState={setState}
        setActive={setActive}
      />
    </Box>
  );
};

export default Body;
