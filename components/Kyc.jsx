"use client";
import {
  CircularProgress,
  Avatar,
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import axios from "@node_modules/axios";
import { useSession } from "@node_modules/next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import KycModal from "./kycModal";

const KYCPage = () => {
  const { data: session, status } = useSession();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async () => {
    if (!image) {
      toast.error("Image is Required", {
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
      const { data } = await axios.post("/api/upload/kyc", {
        image: image,
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
      setImage("");
      setLoading(false);
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

  return (
    <>
      <Box sx={{ background: "#242731" }} className="px-4 py-20 rounded-xl">
        <Typography className="text-4xl font-extrabold">
          Hii, {session?.user?.username}
        </Typography>
        <Typography className="mt-8">
          To ensure a secure and trustworthy environment for all our users, we
          kindly request you to submit your verification documents. Completing
          this process is quick and easy, and it helps us maintain the integrity
          of our platform. It only takes a few minutes to complete the
          verification process.
        </Typography>
        <Stack direction="row">
          <Typography className="py-2 px-2 mt-6 rounded-2xl bg-red-500">
            Not Verified
          </Typography>
          <div></div>
        </Stack>

        <Button
          onClick={() => setOpen(true)}
          className="text-white mt-3 py-3 px-3 rounded-2xl"
          sx={{ backgroundColor: "#3f3fc2 !important", flex: "1" }}
        >
          Click here to submit{" "}
        </Button>
      </Box>
      <KycModal open={open} setOpen={setOpen} />
    </>
    // <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
    //   <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
    //     KYC Verification
    //   </h2>
    //   <div className="flex flex-col space-y-6">
    //     <div className="flex flex-col items-center">
    //       <label
    //         htmlFor="imageUpload"
    //         className="block text-gray-600 font-medium mb-2"
    //       >
    //         Upload Your ID
    //       </label>
    //       <input
    //         type="file"
    //         id="imageUpload"
    //         accept="image/*"
    //         onChange={async (e) => {
    //           const file = e.target?.files;
    //           if (file) {
    //             try {
    //               setUploading(true);
    //               const { data } = await axios.post(
    //                 "/api/cloudinaryupload/profile",
    //                 file
    //               );
    //               setImage(data?.photosArray[0].url);
    //               setUploading(false);
    //             } catch (error) {
    //               setUploading(false);
    //               toast.error("Unable to upload", {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: true,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //               });
    //             }
    //           }
    //         }}
    //         className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
    //       />
    //       <div style={{ marginTop: "10px" }}>
    //         {uploading ? (
    //           <div
    //             style={{
    //               width: "150px",
    //               height: "150px",
    //               border: "0.1px solid #cacecf",
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //               borderRadius: "5px",
    //             }}
    //           >
    //             <CircularProgress sx={{ color: "rgba(0,212,255,1)" }} />
    //           </div>
    //         ) : (
    //           <>
    //             {image && (
    //               <>
    //                 <Avatar
    //                   src={image}
    //                   alt="screendhot"
    //                   sx={{
    //                     width: "100px",
    //                     height: "100px",
    //                     borderRadius: "5px",
    //                   }}
    //                 />
    //               </>
    //             )}
    //           </>
    //         )}
    //       </div>
    //     </div>
    //     <button
    //       onClick={() => (image ? handleSubmit() : undefined)}
    //       className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    //     >
    //       {loading ? (
    //         <CircularProgress sx={{ color: "white" }} size={15} />
    //       ) : (
    //         "Submit"
    //       )}
    //     </button>
    //   </div>
    // </div>
  );
};

export default KYCPage;
