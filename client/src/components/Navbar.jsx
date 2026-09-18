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

function Navbar() {
  const navigate = useNavigate();

  const buttonLogout = () => {
    Auth.logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Weight Tracker
        </Typography>

        {Auth.loggedIn() && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
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