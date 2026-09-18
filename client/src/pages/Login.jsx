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

function Login() {
  const navigate = useNavigate();

  const [
    editTextUsername,
    setEditTextUsername,
  ] = useState("");

  const [
    editTextPassword,
    setEditTextPassword,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [loginUser] =
    useMutation(LOGIN_USER);

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