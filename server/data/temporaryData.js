export const users = [];
export const weights = [];
export const goals = [];
export const calorieEntries = [];

let nextUserId = 1;
let nextWeightId = 1;
let nextGoalId = 1;
let nextCalorieEntryId = 1;

export const getNextUserId = () => {
  return nextUserId++;
};

export const getNextWeightId = () => {
  return nextWeightId++;
};

export const getNextGoalId = () => {
  return nextGoalId++;
};

export const getNextCalorieEntryId = () => {
  return nextCalorieEntryId++;
};