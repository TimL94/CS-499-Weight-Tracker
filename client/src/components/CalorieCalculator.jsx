import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  calculateCalories,
} from "../utils/calorieCalculator.js";

function CalorieCalculator() {
  const [editTextAge, setEditTextAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [editTextHeight, setEditTextHeight] =
    useState("");

  const [editTextWeight, setEditTextWeight] =
    useState("");

  const [calorieCalculation, setCalorieCalculation] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const clearCalculation = () => {
    setCalorieCalculation(null);
    setErrorMessage("");
  };

  const buttonCalculateCalories = (event) => {
    event.preventDefault();
    clearCalculation();

    try {
      if (
        editTextAge.trim() === "" ||
        gender === "" ||
        editTextHeight.trim() === "" ||
        editTextWeight.trim() === ""
      ) {
        throw new Error(
          "Complete all calculator fields."
        );
      }

      const result = calculateCalories({
        age: Number(editTextAge),
        gender,
        height: Number(editTextHeight),
        weight: Number(editTextWeight),
      });

      setCalorieCalculation(result);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 1 }}
        >
          Calorie Calculator
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Estimate maintenance calories using a sedentary
          activity assumption. Enter height in total inches
          and weight in pounds.
        </Typography>

        <Box
          component="form"
          onSubmit={buttonCalculateCalories}
          noValidate
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <TextField
              id="editTextAge"
              label="Age"
              type="number"
              value={editTextAge}
              onChange={(event) => {
                setEditTextAge(event.target.value);
                clearCalculation();
              }}
              slotProps={{
                htmlInput: {
                  min: 18,
                  max: 120,
                  step: 1,
                },
              }}
              helperText="Whole years, ages 18–120"
              fullWidth
              required
            />

            <TextField
              id="gender"
              label="Sex used by equation"
              select
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
                clearCalculation();
              }}
              helperText="Select the equation coefficient"
              fullWidth
              required
            >
              <MenuItem value="male">
                Male
              </MenuItem>

              <MenuItem value="female">
                Female
              </MenuItem>
            </TextField>

            <TextField
              id="editTextHeight"
              label="Height (inches)"
              type="number"
              value={editTextHeight}
              onChange={(event) => {
                setEditTextHeight(event.target.value);
                clearCalculation();
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "any",
                },
              }}
              helperText="Example: 5 feet 10 inches = 70"
              fullWidth
              required
            />

            <TextField
              id="calculatorEditTextWeight"
              label="Weight (pounds)"
              type="number"
              value={editTextWeight}
              onChange={(event) => {
                setEditTextWeight(event.target.value);
                clearCalculation();
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: "any",
                },
              }}
              helperText="Enter your current weight"
              fullWidth
              required
            />
          </Box>

          <Button
            id="buttonCalculateCalories"
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Calculate Calories
          </Button>
        </Box>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Alert>
        )}

        {calorieCalculation && (
          <Box
            role="status"
            aria-live="polite"
            sx={{
              mt: 3,
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              component="h3"
            >
              Estimated Maintenance Calories
            </Typography>

            <Typography
              variant="h4"
              component="p"
              sx={{ my: 1 }}
            >
              {calorieCalculation.recommendedCalories
                .toLocaleString()}{" "}
              kcal/day
            </Typography>

            <Typography variant="body2">
              Estimated resting needs:{" "}
              {calorieCalculation.restingCalories
                .toLocaleString()}{" "}
              kcal/day
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Uses a sedentary activity multiplier of{" "}
              {calorieCalculation.activityMultiplier}.
              Actual needs vary with activity and individual
              circumstances. No weight-loss deficit is included.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default CalorieCalculator;