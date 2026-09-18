import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          "background.default",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
