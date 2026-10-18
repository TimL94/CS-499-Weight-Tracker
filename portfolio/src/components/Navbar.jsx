import { useApolloClient } from "@apollo/client/react";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Auth from "../utils/auth.js";

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
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            whiteSpace: "nowrap",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Weight Tracker
        </Typography>

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