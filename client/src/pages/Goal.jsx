import {
  useEffect,
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
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
} from "@apollo/client/react";

import {
  GET_GOAL_WEIGHT,
} from "../utils/queries.js";

import {
  SAVE_GOAL_WEIGHT,
} from "../utils/mutations.js";

// Provides a form for users to set their goal weight and handles the goal weight saving process.
function Goal() {
  const navigate =
    useNavigate();

  // State variable for managing the goal weight input field.
  const [
    goal_weight,
    setGoalWeight,
  ] = useState("");

  // State variable for managing error messages related to form submission.
  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  // Fetches the user's goal weight from the GraphQL API and manages loading and error states.
  const {
    data,
    loading,
    error,
  } = useQuery(
    GET_GOAL_WEIGHT
  );

  // GraphQL mutation for saving the user's goal weight.
  const [saveGoalWeight] =
    useMutation(
      SAVE_GOAL_WEIGHT
    );

    // Updates the goal weight state when the data from the GraphQL query changes.
  useEffect(() => {
    if (
      data?.getGoalWeight
    ) {
      setGoalWeight(
        data.getGoalWeight
          .goal_weight
      );
    }
  }, [data]);

  // Handles the form submission for setting the user's goal weight, including validation and error handling.
  const buttonSetGoal =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

      try {
        const goalWeightNumber =
          Number(
            goal_weight
          );

        if (
          !goal_weight ||
          goalWeightNumber <=
            0
        ) {
          throw new Error(
            "Goal weight must be greater than zero."
          );
        }

        await saveGoalWeight({
          variables: {
            goal_weight:
              goalWeightNumber,
          },

          refetchQueries: [
            GET_GOAL_WEIGHT,
          ],
        });

        navigate(
          "/weight-log"
        );
      } catch (error) {
        setErrorMessage(
          error.message
        );
      }
    };

  // Handles the cancel button click event, navigating the user back to the weight log page without saving any changes.
  const buttonCancelGoal =
    () => {
      navigate(
        "/weight-log"
      );
    };

  // Renders the Goal component, including the form for setting the goal weight and any error messages.
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
            Goal Weight
          </Typography>

          {loading && (
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Loading...
            </Typography>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
              }}
            >
              {error.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={
              buttonSetGoal
            }
            sx={{
              display: "flex",
              flexDirection:
                "column",
              gap: 2,
            }}
          >
            <TextField
              id="goal_weight"
              label="Goal Weight"
              type="number"
              value={
                goal_weight
              }
              onChange={(
                event
              ) =>
                setGoalWeight(
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
              id="buttonSetGoal"
              variant="contained"
              type="submit"
              size="large"
            >
              Set Goal
            </Button>

            <Button
              variant="outlined"
              type="button"
              onClick={
                buttonCancelGoal
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

export default Goal;