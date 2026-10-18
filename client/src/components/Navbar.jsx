import { useApolloClient } from "@apollo/client/react";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Auth from "../utils/auth.js";
import weightTrackerLogo from "../assets/weight-tracker-logo.svg";

// Displays navigation links for logged-in users.
function Navbar() {
  const navigate = useNavigate();
  const client = useApolloClient();

  // Clears authentication and cached account data.
  const buttonLogout = async () => {
    Auth.logout();
    await client.clearStore();
    navigate("/login");
  };

  // Displays navigation based on the user's authentication status.
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 1, sm: 2 },
          py: { xs: 1.5, sm: 0 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={weightTrackerLogo}
            alt="Weight Tracker"
            width={192}
            height={64}
            sx={{
              display: "block",
              width: { xs: 180, sm: 168 },
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>

        {Auth.loggedIn() && (
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-end" },
              gap: { xs: 0.5, sm: 1 },
              width: { xs: "100%", sm: "auto" },
              "& .MuiButton-root": {
                minWidth: 0,
                flexShrink: 0,
                px: 1,
              },
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/weight-log"
            >
              Weight
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/goal"
            >
              Goal
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/calories"
            >
              Calories
            </Button>

            <Button
              id="buttonLogout"
              color="inherit"
              onClick={buttonLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;