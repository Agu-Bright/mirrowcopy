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
  const handleCopy = (address) => {
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
  const [state, setState] = useState(false);
  const [state2, setState2] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const columns = ["Account Name", "Email", "screenshot", "Created At"];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/upload/getKyc`);
        console.log(data);
        setWallets(data?.kycs.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/api/withdraw/get-withdrawal`);
        console.log(data);
        setWithdraws(data?.withdraws.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [state2]);

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
        <>
          {order?.image && (
            <a
              href={order?.image}
              target="_blank"
              className="text-white underline"
            >
              view KYC
            </a>
          )}
        </>,

        formatDateToReadable(order?.createdAt),
      ])
    );

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: "#152953",
              color: "white",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              background: "#152953",
              color: "white",
            },
            head: {
              background: "#152953",
              color: "white",
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
          title="KYC Submissions"
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>

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
