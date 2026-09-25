const POUNDS_TO_KILOGRAMS = 0.45359237;
const INCHES_TO_CENTIMETERS = 2.54;
const ACTIVITY_MULTIPLIER = 1.2;

const GENDER_ADJUSTMENTS = Object.freeze({
  male: 5,
  female: -161,
});

export const calculateCalories = ({
  age,
  gender,
  height,
  weight,
}) => {
  if (
    !Number.isInteger(age) ||
    age < 18 ||
    age > 120
  ) {
    throw new Error(
      "Age must be a whole number between 18 and 120."
    );
  }

  if (
    gender !== "male" &&
    gender !== "female"
  ) {
    throw new Error(
      "Select male or female for the equation."
    );
  }

  if (
    !Number.isFinite(height) ||
    height <= 0
  ) {
    throw new Error(
      "Height must be greater than zero."
    );
  }

  if (
    !Number.isFinite(weight) ||
    weight <= 0
  ) {
    throw new Error(
      "Weight must be greater than zero."
    );
  }

  const weightKilograms =
    weight * POUNDS_TO_KILOGRAMS;

  const heightCentimeters =
    height * INCHES_TO_CENTIMETERS;

  // Mifflin-St Jeor equation:
  // https://pubmed.ncbi.nlm.nih.gov/2305711/
  const restingCalories =
    10 * weightKilograms +
    6.25 * heightCentimeters -
    5 * age +
    GENDER_ADJUSTMENTS[gender];

  // Fixed sedentary assumption, without a weight-loss deficit.
  const recommendedCalories =
    restingCalories * ACTIVITY_MULTIPLIER;

  if (
    !Number.isFinite(restingCalories) ||
    !Number.isFinite(recommendedCalories) ||
    restingCalories <= 0
  ) {
    throw new Error(
      "These measurements do not produce a valid calorie estimate."
    );
  }

  return {
    restingCalories: Math.round(restingCalories),
    recommendedCalories: Math.round(
      recommendedCalories
    ),
    activityMultiplier: ACTIVITY_MULTIPLIER,
  };
};