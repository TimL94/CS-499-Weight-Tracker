import { useState } from "react";
import { useMutation } from "@apollo/client/react";

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

import { GET_CALORIE_CALCULATION } from "../utils/queries.js";
import { SAVE_CALORIE_CALCULATION } from "../utils/mutations.js";
import { calculateCalories } from "../utils/calorieCalculator.js";

function CalorieCalculator({ savedCalculation }) {
  const [editTextAge, setEditTextAge] = useState(
    String(savedCalculation?.age ?? "")
  );

  const [gender, setGender] = useState(
    savedCalculation?.gender ?? ""
  );

  const [editTextFeet, setEditTextFeet] = useState(
    String(savedCalculation?.feet ?? "")
  );

  const [editTextInches, setEditTextInches] = useState(
    String(savedCalculation?.inches ?? "")
  );

  const [editTextWeight, setEditTextWeight] = useState(
    String(savedCalculation?.weight ?? "")
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const [saveCalorieCalculation, { loading: saving }] =
    useMutation(SAVE_CALORIE_CALCULATION, {
      // Updates the saved recommendation displayed by CalorieLog.
      update(cache, { data }) {
        if (data?.saveCalorieCalculation) {
          cache.writeQuery({
            query: GET_CALORIE_CALCULATION,
            data: {
              getCalorieCalculation:
                data.saveCalorieCalculation,
            },
          });
        }
      },
    });

  // Clears form messages while keeping the saved recommendation.
  const clearFeedback = () => {
    setErrorMessage("");
    setSaved(false);
  };

  const buttonCalculateCalories = async (event) => {
    event.preventDefault();
    clearFeedback();

    try {
      if (
        editTextAge.trim() === "" ||
        gender === "" ||
        editTextFeet.trim() === "" ||
        editTextInches.trim() === "" ||
        editTextWeight.trim() === ""
      ) {
        throw new Error("Complete all calculator fields.");
      }

      const feet = Number(editTextFeet);
      const inches = Number(editTextInches);

      if (!Number.isInteger(feet) || feet < 0) {
        throw new Error(
          "Feet must be a whole number of zero or greater."
        );
      }

      if (
        !Number.isFinite(inches) ||
        inches < 0 ||
        inches >= 12
      ) {
        throw new Error(
          "Inches must be zero or greater and less than 12."
        );
      }

      // Validates the inputs using the existing formula.
      calculateCalories({
        age: Number(editTextAge),
        gender,
        height: feet * 12 + inches,
        weight: Number(editTextWeight),
      });

      // The server calculates and saves the inputs and recommendation.
      const { data } = await saveCalorieCalculation({
        variables: {
          age: Number(editTextAge),
          gender,
          feet,
          inches,
          weight: Number(editTextWeight),
        },
      });

      if (!data?.saveCalorieCalculation) {
        throw new Error(
          "The server did not return a saved calculation."
        );
      }

      setSaved(true);
    } catch (error) {
      setErrorMessage(
        `Calculation was not saved. ${error.message}`
      );
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
          activity assumption. Enter height in feet and inches
          and weight in pounds. Your latest saved inputs and
          result will load automatically when you return.
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
              disabled={saving}
              label="Age"
              type="number"
              value={editTextAge}
              onChange={(event) => {
                setEditTextAge(event.target.value);
                clearFeedback();
              }}
              slotProps={{
                htmlInput: {
                  min: 18,
                  max: 120,
                  step: 1,
                },
              }}
              helperText="Enter an age from 18-120"
              fullWidth
              required
            />

            <TextField
              id="gender"
              disabled={saving}
              label="Select Sex"
              select
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
                clearFeedback();
              }}
              helperText="Sex is used to determine the equation adjustment"
              fullWidth
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                id="editTextFeet"
                disabled={saving}
                label="Height (feet)"
                type="number"
                value={editTextFeet}
                onChange={(event) => {
                  setEditTextFeet(event.target.value);
                  clearFeedback();
                }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 1,
                  },
                }}
                helperText="Whole feet"
                fullWidth
                required
              />

              <TextField
                id="editTextInches"
                disabled={saving}
                label="Height (inches)"
                type="number"
                value={editTextInches}
                onChange={(event) => {
                  setEditTextInches(event.target.value);
                  clearFeedback();
                }}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: "any",
                  },
                }}
                helperText="Value from 0-11"
                fullWidth
                required
              />
            </Box>

            <TextField
              id="calculatorEditTextWeight"
              disabled={saving}
              label="Weight (pounds)"
              type="number"
              value={editTextWeight}
              onChange={(event) => {
                setEditTextWeight(event.target.value);
                clearFeedback();
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
            disabled={saving}
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            {saving
              ? "Saving..."
              : "Calculate and Save Calories"}
          </Button>
        </Box>

        {saved && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Calculation saved to your account.
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default CalorieCalculator;