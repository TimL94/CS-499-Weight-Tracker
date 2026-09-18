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

function AddWeight() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [
    editingWeightId,
    setEditingWeightId,
  ] = useState(
    location.state
      ?.editingWeightId ??
      null
  );

  const [
    editTextDate,
    setEditTextDate,
  ] = useState(
    location.state
      ?.editTextDate ??
      ""
  );

  const [
    editTextWeight,
    setEditTextWeight,
  ] = useState(
    location.state
      ?.editTextWeight ??
      ""
  );

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [addWeight] =
    useMutation(
      ADD_WEIGHT
    );

  const [updateWeight] =
    useMutation(
      UPDATE_WEIGHT
    );

  const buttonSaveWeight =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

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

  const buttonCancelAddWeight =
    () => {
      navigate(
        "/weight-log"
      );
    };

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