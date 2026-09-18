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

function Goal() {
  const navigate =
    useNavigate();

  const [
    goal_weight,
    setGoalWeight,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const {
    data,
    loading,
    error,
  } = useQuery(
    GET_GOAL_WEIGHT
  );

  const [saveGoalWeight] =
    useMutation(
      SAVE_GOAL_WEIGHT
    );

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

  const buttonCancelGoal =
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