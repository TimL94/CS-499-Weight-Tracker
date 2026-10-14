import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateCalories,
} from "../src/utils/calorieCalculator.js";

const validInput = {
  age: 30,
  gender: "male",
  height: 70,
  weight: 180,
};

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("calculates the expected male result", () => {
  assert.deepEqual(
    calculateCalories(validInput),
    {
      restingCalories: 1783,
      recommendedCalories: 2139,
      activityMultiplier: 1.2,
    }
  );
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("calculates the expected female result", () => {
  assert.deepEqual(
    calculateCalories({
      ...validInput,
      gender: "female",
    }),
    {
      restingCalories: 1617,
      recommendedCalories: 1940,
      activityMultiplier: 1.2,
    }
  );
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("accepts ages 18 and 120", () => {
  for (const age of [18, 120]) {
    const result = calculateCalories({
      ...validInput,
      age,
    });

    assert.ok(result.restingCalories > 0);
    assert.ok(
      result.recommendedCalories >
      result.restingCalories
    );
  }
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("rejects invalid ages", () => {
  for (const age of [
    undefined,
    null,
    "30",
    NaN,
    Infinity,
    0,
    17,
    121,
    30.5,
  ]) {
    assert.throws(
      () => calculateCalories({
        ...validInput,
        age,
      }),
      /Age must/
    );
  }
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("rejects invalid equation selections", () => {
  for (const gender of [
    undefined,
    "",
    "invalid",
  ]) {
    assert.throws(
      () => calculateCalories({
        ...validInput,
        gender,
      }),
      /Select male or female/
    );
  }
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("rejects invalid height and weight", () => {
  for (const field of ["height", "weight"]) {
    for (const value of [
      undefined,
      null,
      "",
      NaN,
      Infinity,
      0,
      -10,
    ]) {
      assert.throws(
        () => calculateCalories({
          ...validInput,
          [field]: value,
        }),
        /must be greater than zero/
      );
    }
  }
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("rejects nonpositive calorie estimates", () => {
  assert.throws(
    () => calculateCalories({
      age: 120,
      gender: "female",
      height: 30,
      weight: 50,
    }),
    /valid calorie estimate/
  );
});

// Test cases for the calculateCalories function, covering various scenarios including valid inputs, edge cases, and error handling.
test("does not change the input object", () => {
  const input = Object.freeze({
    ...validInput,
  });

  calculateCalories(input);

  assert.deepEqual(input, validInput);
});