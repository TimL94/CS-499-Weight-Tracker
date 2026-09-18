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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  useMutation,
  useQuery,
} from "@apollo/client/react";

import {
  ADD_CALORIE_ENTRY,
} from "../utils/mutations.js";

import {
  GET_CALORIE_ENTRIES_FOR_USER,
} from "../utils/queries.js";

function CalorieLog() {
  const [
    editTextDate,
    setEditTextDate,
  ] = useState("");

  const [
    editTextCalories,
    setEditTextCalories,
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
    GET_CALORIE_ENTRIES_FOR_USER
  );

  const [
    addCalorieEntry,
  ] = useMutation(
    ADD_CALORIE_ENTRY
  );

  const buttonSaveCalories =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");

      try {
        const calories =
          Number(
            editTextCalories
          );

        if (
          !editTextDate
        ) {
          throw new Error(
            "Date is required."
          );
        }

        if (
          editTextCalories ===
            "" ||
          calories < 0
        ) {
          throw new Error(
            "Calories cannot be negative."
          );
        }

        await addCalorieEntry({
          variables: {
            date:
              editTextDate,

            calories:
              calories,
          },

          refetchQueries: [
            GET_CALORIE_ENTRIES_FOR_USER,
          ],
        });

        setEditTextDate(
          ""
        );

        setEditTextCalories(
          ""
        );
      } catch (error) {
        setErrorMessage(
          error.message
        );
      }
    };

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
        Calorie Log
      </Typography>

      <Card
        sx={{
          mb: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
            }}
          >
            Add Calorie Entry
          </Typography>

          <Box
            component="form"
            onSubmit={
              buttonSaveCalories
            }
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm:
                  "1fr 1fr auto",
              },
              gap: 2,
              alignItems:
                "center",
            }}
          >
            <TextField
              id="editTextDate"
              label="Date"
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
              required
            />

            <TextField
              id="editTextCalories"
              label="Calories"
              type="number"
              value={
                editTextCalories
              }
              onChange={(
                event
              ) =>
                setEditTextCalories(
                  event.target
                    .value
                )
              }
              inputProps={{
                min: "0",
                step: "1",
              }}
              required
            />

            <Button
              id="buttonSaveCalories"
              variant="contained"
              type="submit"
              sx={{
                height: {
                  sm: 56,
                },
              }}
            >
              Save Calories
            </Button>
          </Box>

          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
              }}
            >
              {
                errorMessage
              }
            </Alert>
          )}
        </CardContent>
      </Card>

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

      <TableContainer
        component={Card}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Date
              </TableCell>

              <TableCell>
                Calories
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data
                ?.getCalorieEntriesForUser
                ?.length > 0 ? (
              data
                .getCalorieEntriesForUser
                .map(
                  (
                    calorieEntry
                  ) => (
                    <TableRow
                      key={
                        calorieEntry.id
                      }
                    >
                      <TableCell>
                        {
                          calorieEntry.date
                        }
                      </TableCell>

                      <TableCell>
                        {
                          calorieEntry.calories
                        }
                      </TableCell>
                    </TableRow>
                  )
                )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  align="center"
                >
                  No calorie
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

export default CalorieLog;