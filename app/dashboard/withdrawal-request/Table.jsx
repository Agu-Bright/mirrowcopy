"use client";
import React, { useContext, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import BasicModal from "./Modal";
import { RestaurantContext } from "@context/RestaurantContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Table = () => {
  const { formatMoney, formatDateToReadable } = useContext(RestaurantContext);

  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);

  const [wallets, setWallets] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const columns = [
    "Account Name",
    "Email",
    "Wallet Address",
    "Amount",
    "status",
    "Created At",
    "Actions",
  ];

  withdraws && console.log(withdraws);
  state && console.log(state);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/deposit/get-withdrawal");
        setWallets(data?.deposits.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);

  const options = {
    responsive: "standard",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [active, setActive] = useState(null);
  const data = [];

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
  wallets &&
    wallets.map((order) =>
      data.push([
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            sx={{
              width: "25px",
              height: "25px",
              fontSize: "12px",
              background: "green",
            }}
            src="/img/man.png"
            alt="avatar"
          />

          <span style={{ marginLeft: "5px" }}>{order?.user?.username} </span>
        </div>,

        order?.user?.email,
        <p
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => handleCopy(order?.walletAddress)}
        >
          {order?.walletAddress}
        </p>,
        <div>
          {" "}
          <span style={{ color: "black", fontWeight: "800" }}></span>{" "}
          {formatMoney(order?.amount)}
        </div>,

        <div
          style={{
            textDecoration: "underline",
            color: getColor(order?.status),
          }}
        >
          {order?.status}
        </div>,
        formatDateToReadable(order?.createdAt),
        <button
          onClick={() => {
            if (order?.status !== "success") {
              setActive(order);
              setTimeout(() => {
                handleOpen();
              }, 1000);
            }
          }}
          style={{
            cursor: "pointer",
            color: "white",
            background: getColor(order?.status),
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          {order?.status !== "success" ? "Update" : "complete"}
        </button>,
      ])
    );

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: "#152953", // Set the background to black
              color: "white", // Text color
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              background: "#152953",
              color: "white", // Ensure text is visible
            },
            head: {
              background: "#152953",
              color: "white", // Header text color
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              background: "#152953",
            },
          },
        },
      },
    });

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="Withdrawal"
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>

      {/* <div style={{ marginTop: "20px" }}>
        <MUIDataTable
          title="Withdrawal Requests"
          data={data2}
          columns={column2}
          options={options}
        />
      </div> */}
      <ToastContainer />
      <BasicModal
        open={open}
        handleClose={handleClose}
        active={active}
        setState={setState}
        setState2={setState2}
      />
    </>
  );
};

export default Table;
