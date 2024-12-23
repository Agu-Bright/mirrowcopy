"use client";
import Navbar from "@components/Navbar";
import React, { useContext, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box, IconButton, Stack } from "@mui/material";
import { RestaurantContext } from "@context/RestaurantContext";
import { useRouter } from "next/navigation";
import Call from "@components/CallModal";
import LiveChatScript from "@components/LiveChat";
import Sidebar from "@components/Sidebar";
import BasicModal from "@app/user/Modal";
import { ToastContainer } from "react-toastify";

const NavPage = ({ children, buttonNav, topNav, title, type }) => {
  const { active, setActive, handleOpen, open, setOpen, handleClose } =
    useContext(RestaurantContext);
  const router = useRouter();
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    if (typeof window !== "undefined" && window.LiveChatWidget) {
      if (chatVisible) {
        window.LiveChatWidget.call("hide");
      } else {
        window.LiveChatWidget.call("maximize");
      }
      setChatVisible(!chatVisible);
    }
  };

  if (type === "dashboard") {
    <Navbar type="dashboard" data={session} />;
  } else
    return (
      <div
        className=" mw[100vw]"
        style={{
          height: "100vh",
          overflowY: "scroll",
          position: "relative",
          background: "#1F2128",
        }}
      >
        <Navbar fixed={false} topNav={topNav} title={title} type="dashboard" />
        <div style={{ marginTop: "14vh" }}>
          <div className="pr-3 pl-3">
            <Stack direction="row" justifyContent="space-between">
              <Sidebar />
              <Box
                className="h-[92.3vh]"
                sx={{ width: { md: "79%", xs: "100%" }, marginBottom: "20px" }}
              >
                {children}
                <BasicModal
                  handleOpen={handleOpen}
                  open={open}
                  setOpen={setOpen}
                  handleClose={handleClose}
                />
              </Box>
            </Stack>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
};

export default NavPage;
