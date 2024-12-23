"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import { Box, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import Card from "@components/Card";
import FAQs from "@components/ui/FAQs";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100%" }}>
          <FAQs />
        </Box>
      </NavPage>
    );
}
