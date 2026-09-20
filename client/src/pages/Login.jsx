import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
} from "@apollo/client/react";

import {
  LOGIN_USER,
} from "../utils/mutations.js";

import Auth from "../utils/auth.js";

// Provides a form for users to log in and handles the login process.
function Login() {
  const navigate = useNavigate();

  // State variables for managing the form inputs and error messages.
  const [
    editTextUsername,
    setEditTextUsername,
  ] = useState("");

  // State variables for managing the form inputs and error messages.
  const [
    editTextPassword,
    setEditTextPassword,
  ] = useState("");

  // State variable for managing error messages related to form submission.
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // GraphQL mutation for logging in a user.
  const [loginUser] =
    useMutation(LOGIN_USER);

    // Handles the form submission for logging in a user, including validation and error handling.
  const buttonLogin =
    async (event) => {
      event.preventDefault();

      try {
        const { data } =
          await loginUser({
            variables: {
              username:
                editTextUsername,
              password:
                editTextPassword,
            },
          });

        Auth.login(
          data.loginUser.token,
          data.loginUser.currentUserId
        );

        navigate("/weight-log");
      } catch (error) {
        setErrorMessage(
          error.message
        );
      }
    };

  // Renders the Login component, including the form for logging in and any error messages.
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ mb: 3 }}
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={buttonLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              id="editTextUsername"
              label="Username"
              value={
                editTextUsername
              }
              onChange={(event) =>
                setEditTextUsername(
                  event.target.value
                )
              }
            />

            <TextField
              id="editTextPassword"
              label="Password"
              type="password"
              value={
                editTextPassword
              }
              onChange={(event) =>
                setEditTextPassword(
                  event.target.value
                )
              }
            />

            {errorMessage && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}

            <Button
              id="buttonLogin"
              variant="contained"
              type="submit"
            >
              Login
            </Button>

            <Button
              id="buttonCreateAccount"
              component={Link}
              to="/create-account"
            >
              Create Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;