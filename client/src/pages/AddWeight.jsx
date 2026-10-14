import {
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
} from "@apollo/client/react";

import {
  ADD_WEIGHT,
  UPDATE_WEIGHT,
} from "../utils/mutations.js";

import {
  GET_WEIGHTS_FOR_USER,
} from "../utils/queries.js";

// Provides a form for users to add or edit their weight entries.
function AddWeight() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  // State variables for managing the form inputs and error messages.
  const [
    editingWeightId,
    setEditingWeightId,
  ] = useState(
    location.state
      ?.editingWeightId ??
      null
  );

  // State variables for managing the form inputs and error messages.
  const [
    editTextDate,
    setEditTextDate,
  ] = useState(
    location.state
      ?.editTextDate ??
      ""
  );

  // State variables for managing the form inputs and error messages.
  const [
    editTextWeight,
    setEditTextWeight,
  ] = useState(
    location.state
      ?.editTextWeight ??
      ""
  );

  // State variable for managing error messages.
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // GraphQL mutations for adding and updating weight entries.
  const [addWeight] =
    useMutation(
      ADD_WEIGHT
    );

  // GraphQL mutations for adding and updating weight entries.
  const [updateWeight] =
    useMutation(
      UPDATE_WEIGHT
    );

  // Handles the form submission for adding or updating a weight entry.
  const buttonSaveWeight =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

     /* Validates the form inputs and performs the appropriate GraphQL mutation 
        based on whether the user is adding a new weight entry or editing an existing one.*/
      try {
        const weight =
          Number(
            editTextWeight
          );

        if (
          !editTextDate
        ) {
          throw new Error(
            "Date is required."
          );
        }

        if (
          !editTextWeight ||
          weight <= 0
        ) {
          throw new Error(
            "Weight must be greater than zero."
          );
        }

        if (
          editingWeightId
        ) {
          await updateWeight({
            variables: {
              id:
                editingWeightId,

              date:
                editTextDate,

              weight:
                weight,
            },

            refetchQueries: [
              GET_WEIGHTS_FOR_USER,
            ],
          });

          setEditingWeightId(
            null
          );
        } else {
          await addWeight({
            variables: {
              date:
                editTextDate,

              weight:
                weight,
            },

            refetchQueries: [
              GET_WEIGHTS_FOR_USER,
            ],
          });
        }

        navigate(
          "/weight-log"
        );
      } catch (error) {
        setErrorMessage(
          error.message
        );
      }
    };

  // Handles the cancel action, navigating the user back to the weight log page without saving changes.
  const buttonCancelAddWeight =
    () => {
      navigate(
        "/weight-log"
      );
    };

  // Renders the form for adding or editing a weight entry, including input fields for date and weight, 
  // and buttons for saving or canceling the action.
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 4,
      }}
    >
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 3,
              textAlign:
                "center",
            }}
          >
            {editingWeightId
              ? "Edit Weight"
              : "Add Weight"}
          </Typography>
          
          <Box
            component="form"
            onSubmit={
              buttonSaveWeight
            }
            sx={{
              display: "flex",
              flexDirection:
                "column",
              gap: 2,
            }}
          >
            <TextField
              id="editTextDate"
              type="date"
              value={
                editTextDate
              }
              onChange={(
                event
              ) =>
                setEditTextDate(
                  event.target
                    .value
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />

            <TextField
              id="editTextWeight"
              label="Weight"
              type="number"
              value={
                editTextWeight
              }
              onChange={(
                event
              ) =>
                setEditTextWeight(
                  event.target
                    .value
                )
              }
              inputProps={{
                step: "0.1",
                min: "0.1",
              }}
              fullWidth
              required
            />

            {errorMessage && (
              <Alert
                severity="error"
              >
                {
                  errorMessage
                }
              </Alert>
            )}

            <Button
              id="buttonSaveWeight"
              variant="contained"
              type="submit"
              size="large"
            >
              Save Weight
            </Button>

            <Button
              id="buttonCancelAddWeight"
              variant="outlined"
              type="button"
              onClick={
                buttonCancelAddWeight
              }
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddWeight;