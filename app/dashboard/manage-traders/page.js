"use client";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import CreateModal from "./CreateModal";
import TraderCard from "@components/TraderCard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/get-traders");
        setTraders(data?.traders);
        setLoading(false);
      } catch (error) {
        console.log("cant get traders");
        setLoading(false);
      }
    })();
  }, [toggle]);

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
        <CircularProgress className="text-gray-400" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else if (session?.user?.role === "user") {
    return (
      <div
        style={{
          height: "100vh",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontWeight: "800",
        }}
      >
        {" "}
        <img width={250} height={250} src="/img/unauth.svg" />
        Unauthorized
      </div>
    );
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100%", paddingBottom: "15px" }}>
          <div>
            <>
              <div className="dashboard-header clearfix">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4 className="text-white">
                      Hi &#x1F44B;, {session?.user?.accountName}{" "}
                      {session?.user?.role === "admin" && (
                        <span style={{ fontSize: "12px", color: "red" }}>
                          Admin
                        </span>
                      )}{" "}
                      {session?.user?.role === "sub-admin" && (
                        <span style={{ fontSize: "12px", color: "red" }}>
                          Customer Service
                        </span>
                      )}{" "}
                    </h4>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="breadcrumb-nav">
                      <ul>
                        {/* <li>
                          <a href="/">Index</a>
                        </li> */}
                        <li>
                          <a href="#" className="active">
                            Manage Traders
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {loading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={20} sx={{ color: "white" }} />
                </Box>
              )}
              {!loading && traders.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "70vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Image
                      src="/img/empty.png"
                      alt="empty"
                      width={200}
                      height={200}
                    />
                    <Typography className="text-white">
                      You currently have not uploaded any trader
                    </Typography>
                    <Button className="mt-8" onClick={() => setOpen(true)}>
                      Create Trader
                    </Button>
                  </Box>
                </Box>
              )}
              {traders.length > 0 && (
                <Box>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={2}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      {traders.map((item) => (
                        <Grid item xs={6} md={3}>
                          <TraderCard key={item?._id} trader={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Button
                    className="mt-8 font-extrabold text-2xl border-blue-500"
                    onClick={() => setOpen(true)}
                  >
                    Create More Trader
                  </Button>
                </Box>
              )}
            </>
          </div>
          <CreateModal open={open} setOpen={setOpen} setToggle={setToggle} />
        </Box>
      </NavPage>
    );
}
