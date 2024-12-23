"use client";
import NavPage from "@components/navPage/NavPage";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Table from "./Table";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React from "react";
import Image from "next/image";
import TradingViewWidget from "@components/TradingViewWidget";
import TradingPairWidget from "@components/TradingPairWidget";
import MyOrder from "@components/MyOrder";
import Buy from "@components/Buy";
import MarketNews from "@components/MarketNews";
import InfoCards from "@components/InfoCard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const summary = {};

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
                    <h4>
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
                            Users
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Table />
            </>
          </div>
        </Box>
      </NavPage>
    );
}
