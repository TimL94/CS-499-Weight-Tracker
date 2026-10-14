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
  CREATE_USER,
} from "../utils/mutations.js";

import Auth from "../utils/auth.js";

// Provides a form for users to create a new account and handles the account creation process.
function CreateAccount() {
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

  // GraphQL mutation for creating a new user account.
  const [createUser] =
    useMutation(CREATE_USER);

  // Handles the form submission for creating a new user account, including validation and error handling.
  const buttonCreateAccount =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

      try {
        const { data } =
          await createUser({
            variables: {
              username:
                editTextUsername,
              password:
                editTextPassword,
            },
          });

        Auth.login(
          data.createUser.token,
          data.createUser.currentUserId
        );

        navigate("/weight-log");
      } catch (error) {
        setErrorMessage(
          error.message
        );
      }
    };

  // Renders the CreateAccount component, including the form for creating a new account and any error messages.
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
            component="h1"
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={
              buttonCreateAccount
            }
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
              fullWidth
              required
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
              fullWidth
              required
            />

            {errorMessage && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}

            <Button
              id="buttonCreateAccount"
              variant="contained"
              type="submit"
              size="large"
            >
              Create Account
            </Button>

            <Button
              component={Link}
              to="/login"
            >
              Back to Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CreateAccount;