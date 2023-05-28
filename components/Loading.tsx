import React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  zIndex: 1000,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(2.5px)",
  flexDirection: "column",
  gap: "1rem",
};

export const Loading: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      component={motion.div}
      sx={LoadingContainerStyles}
    >
      <CircularProgress
        sx={{
          color: "#fff",
        }}
      />
      {children}
    </Box>
  );
};
