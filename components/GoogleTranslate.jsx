"use client";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";

const GoogleTranslateDropdown = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // List of languages to display in the dropdown
  const allowedLanguages = [
    "en", // English
    "ja", // Japanese
    "it", // Italian
    "es", // Spanish
    "hu", // Hungarian
    "pt", // Portuguese
    "de", // German
    "fr", // French
    "vi", // Vietnamese
  ];

  useEffect(() => {
    // Dynamically load the Google Translate script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.defer = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load the Google Translate script.");
    };
    document.body.appendChild(script);

    // Define the callback function required by Google Translate
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: allowedLanguages.join(","), // Restrict languages
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing Google Translate:", error);
      }
    };

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  const handleTranslate = () => {
    if (isScriptLoaded && !isInitialized) {
      window.googleTranslateElementInit();
    }
  };

  return (
    <>
      <IconButton onClick={handleTranslate}>
        <GTranslateIcon sx={{ color: "white" }} />
      </IconButton>
      <div
        id="google_translate_element"
        style={{
          display: isInitialized ? "block" : "none",
        }}
      ></div>
    </>
  );
};

export default GoogleTranslateDropdown;
