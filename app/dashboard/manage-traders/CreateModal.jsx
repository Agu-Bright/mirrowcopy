"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

export default function CreateModal({ open, setOpen, setToggle }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    followers: "",
    profitRate: "",
    riskScore: "",
    confidence: "",
    location: "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target?.files;
    if (file) {
      try {
        setUploading(true);
        const { data } = await axios.post(
          "/api/cloudinaryupload/profile",
          file
        );
        setImage(data?.photosArray[0].url);
        setFormData({ ...formData, image: data?.photosArray[0].url });
        setUploading(false);
      } catch (error) {
        setUploading(false);
        toast.error("Unable to upload image", {
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
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-trader", formData);
      toast.success("Trader Uploaded", {
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
      setFormData({
        name: "",
        image: "",
        followers: "",
        profitRate: "",
        riskScore: "",
        confidence: "",
        location: "",
      });
      setToggle((prev) => !prev);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to create trader. Try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Create Trader
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Followers"
            name="followers"
            variant="outlined"
            fullWidth
            value={formData.followers}
            onChange={handleInputChange}
          />
          <TextField
            label="Profit Rate"
            name="profitRate"
            variant="outlined"
            fullWidth
            value={formData.profitRate}
            onChange={handleInputChange}
          />
          <TextField
            label="Risk Score"
            name="riskScore"
            variant="outlined"
            fullWidth
            value={formData.riskScore}
            onChange={handleInputChange}
          />
          <TextField
            label="Confidence"
            name="confidence"
            variant="outlined"
            fullWidth
            value={formData.confidence}
            onChange={handleInputChange}
          />
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            component="label"
            disabled={uploading}
            sx={{ mt: 1 }}
          >
            {uploading ? <CircularProgress size={24} /> : "Upload Image"}
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>

          {formData?.image && (
            <div style={{ marginTop: "10px" }}>
              {uploading ? (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "0.1px solid #cacecf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <CircularProgress sx={{ color: "rgba(0,212,255,1)" }} />
                </div>
              ) : (
                <>
                  {image && (
                    <Avatar
                      src={formData?.image}
                      alt="screendhot"
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </>
              )}
            </div>
          )}
          <Button
            variant="contained"
            component="label"
            disabled={loading || uploading}
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
