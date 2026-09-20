import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  GET_WEIGHTS_FOR_USER,
} from "../utils/queries.js";

import {
  DELETE_WEIGHT,
} from "../utils/mutations.js";

// Provides a view for users to see their weight log, including their goal weight and a table of weight entries.
function WeightLog() {

  // Navigation hook for programmatic navigation between routes.
  const navigate = useNavigate();

  // Fetches the user's weight entries from the GraphQL API and manages loading and error states.
  const {
    data: weightData,
    loading: weightLoading,
    error: weightError,
    refetch: refetchWeights,
  } = useQuery(
    GET_WEIGHTS_FOR_USER,
    {
        fetchPolicy: "network-only",
    }
  );

  // Fetches the user's goal weight from the GraphQL API and manages loading and error states.
  const {
    data: goalData,
    loading: goalLoading,
    error: goalError,
  } = useQuery(
    GET_GOAL_WEIGHT
  );

  // GraphQL mutation for deleting a weight entry.
  const [
    deleteWeight,
    {
      error: deleteWeightError,
    },
  ] = useMutation(
    DELETE_WEIGHT
  );

  // Handles the navigation to the AddWeight page when the "Add Weight" button is clicked.
  const buttonAddWeight = () => {
    navigate("/add-weight");
  };

  // Handles the navigation to the Goal page when the "Set Goal" button is clicked.
  const buttonSetGoal = () => {
    navigate("/goal");
  };

  // Handles the navigation to the AddWeight page with pre-filled data for editing a weight entry.
  const editWeight = (
    weightEntry
  ) => {
    navigate(
      "/add-weight",
      {
        state: {
          editingWeightId:
            weightEntry.id,

          editTextDate:
            weightEntry.date,

          editTextWeight:
            weightEntry.weight,
        },
      }
    );
  };

  // Handles the deletion of a weight entry and refetches the weight entries to update the table.
  const removeWeight =
    async (
      editingWeightId
    ) => {
      try {
        await deleteWeight({
          variables: {
            id:
              editingWeightId,
          },
        });

        await refetchWeights();
      } catch (error) {
        console.error(
          error.message
        );
      }
    };

  // Renders the WeightLog component, including the goal weight display, add weight button, and the table of weight entries.
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: "bold",
        }}
      >
        Weight Log
      </Typography>

      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent:
                "space-between",
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Goal Weight
              </Typography>

              <Typography
                id="textViewGoalWeight"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {goalLoading
                  ? "Loading..."
                  : goalData
                      ?.getGoalWeight
                      ?.goal_weight ??
                    "Not Set"}
              </Typography>
            </Box>

            <Button
              id="buttonSetGoal"
              variant="outlined"
              onClick={
                buttonSetGoal
              }
            >
              Set Goal
            </Button>
          </Box>
        </CardContent>
      </Card>

      {goalError && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {
            goalError.message
          }
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "flex-end",
          mb: 2,
        }}
      >
        <Button
          id="buttonAddWeight"
          variant="contained"
          onClick={
            buttonAddWeight
          }
        >
          Add Weight
        </Button>
      </Box>

      {weightError && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {
            weightError.message
          }
        </Alert>
      )}

      {deleteWeightError && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {
            deleteWeightError.message
          }
        </Alert>
      )}

      <TableContainer
        id="tableWeightLog"
        component={Card}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Date
              </TableCell>

              <TableCell>
                Weight
              </TableCell>

              <TableCell
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {weightLoading ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : weightData
                ?.getWeightsForUser
                ?.length > 0 ? (
              weightData
                .getWeightsForUser
                .map(
                  (
                    weightEntry
                  ) => (
                    <TableRow
                      key={
                        weightEntry.id
                      }
                    >
                      <TableCell>
                        {
                          weightEntry.date
                        }
                      </TableCell>

                      <TableCell>
                        {
                          weightEntry.weight
                        }
                      </TableCell>

                      <TableCell
                        align="right"
                      >
                        <Box
                          sx={{
                            display:
                              "flex",
                            justifyContent:
                              "flex-end",
                            gap: 1,
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              editWeight(
                                weightEntry
                              )
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              removeWeight(
                                weightEntry.id
                              )
                            }
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                >
                  No weight
                  entries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default WeightLog;