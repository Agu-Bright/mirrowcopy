"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
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
import TraderCard from "@components/TraderCard";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);
  const [active, setActive] = useState(null);

  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);

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
              <Typography className="text-white text-4xl font-extrabold">
                Expert Traders{" "}
              </Typography>
            </Box>
            <Box className="w-[100%] mt-4">
              <Typography>
                The Grin blockchain has presented significant technical
                challenges
              </Typography>

              {active === null && (
                <>
                  {loading && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "70vh",
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
                              <TraderCard
                                key={item?._id}
                                trader={item}
                                setActive={setActive}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {active && (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <IconButton onClick={() => setActive(null)}>
                      <ArrowBackIosNewIcon sx={{ color: "white" }} />
                    </IconButton>
                    <div></div>
                  </Stack>
                  <Box className="mt-5 rounded-xl min-h-[60vh] sm:min-h-[50vh] mb-5 relative bg-[#242731] z-10">
                    <Box
                      className="absolute left-1/2 transform -translate-x-1/2 rounded-xl h-[100%] w-[99%] bottom-[-10px] z-0"
                      sx={{
                        background: "#21242D",
                        padding: { md: "30px", xs: "10px" },
                      }}
                    >
                      <Stack
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Stack
                          direction={{ md: "row", xs: "column" }}
                          justifyContent="space-between"
                          sx={{ height: "50%" }}
                        >
                          <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                            <Typography className="text-white text-3xl font-semibold">
                              {active?.name} {`(${active?.location})`}
                            </Typography>
                            <Typography className="text-white text-4xl font-semibold mt-3">
                              {/* {formatMoney(myWallet?.balance)} */}
                              <Avatar src={active?.image} alt="image" />
                            </Typography>
                            <Typography
                              sx={{ color: "#808191" }}
                              className="text-4xl font-semibold mt-3"
                            >
                              Followers: {active?.followers}
                              {/* {btc} BTC */}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: { md: "50%", xs: "100%" },
                              marginTop: { md: "", xs: "10px" },
                            }}
                            className="px-4  md:px-0"
                          >
                            <Box>
                              <Stack
                                direction="row"
                                justifyContent={{
                                  md: "flex-end",
                                  xs: "space-between",
                                }}
                              >
                                {" "}
                                <LinearProgressWithLabel value={20} />
                              </Stack>
                            </Box>
                          </Box>
                        </Stack>

                        <Stack
                          sx={{
                            height: "auto",
                            padding: "10px",
                            marginTop: { md: "", xs: "70px" },
                          }}
                          direction={{ md: "row", xs: "column" }}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: { md: "45%", xs: "100%" },
                              border: "0.1px solid gray",
                              borderRadius: "10px",
                              padding: "25px 15px",
                              marginBottom: { md: "", xs: "10px" },
                            }}
                          >
                            <Stack direction="row">
                              <Box>
                                <Typography
                                  sx={{ color: "#808191", fontSize: "1.2em" }}
                                >
                                  Trades{" "}
                                </Typography>
                                <Typography sx={{ color: "white" }}>
                                  $0.00
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>{" "}
                          <Box
                            sx={{
                              width: { md: "45%", xs: "100%" },
                              border: "0.1px solid gray",
                              borderRadius: "10px",
                              padding: "25px 15px",
                            }}
                          >
                            <Stack direction="row">
                              <Box>
                                <Typography
                                  sx={{ color: "#808191", fontSize: "1.2em" }}
                                >
                                  Confidence{" "}
                                </Typography>
                                <Typography sx={{ color: "white" }}>
                                  {active?.confidence}%
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>{" "}
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
