import { Box, Button, Paper, Typography } from '@mui/material';

const repositoryUrl = 'https://github.com/TimL94/CS-499-Weight-Tracker';

const paragraphs = [
  `For this enhancement, I expanded the Weight Tracker application I originally
  created in CS 360 by adding a calorie calculator to the web application’s
  calorie log. I selected this feature because it
  connects algorithmic problem solving with my focus on full stack development.
  It gave me an opportunity to implement a calculation, organize its inputs and
  outputs, evaluate design tradeoffs, and verify the results through unit
  testing.`,

  `The calculator accepts age, sex, height, and weight. It validates those
  inputs and uses the Mifflin St Jeor equation to estimate resting calorie
  needs. It then applies a fixed activity multiplier of 1.2 to estimate
  maintenance calories. The interface identifies the sedentary assumption
  so the scope of the estimate is clear.`,

  `I used an object to associate each sex selection with its equation
  adjustment and another object to return the calculated results. Named
  constants identify measurement conversions and the activity multiplier.
  This structure makes the function easier to read and gives the interface
  named results to display. The calculation performs a fixed number of
  operations and uses a fixed amount of additional storage, giving it O(1)
  time and O(1) auxiliary space complexity. These measurements describe the
  calculation function itself; network requests and database operations are
  separate from that analysis.`,

  `I separated the calculation function from the React component so I could
  test the mathematical logic independently of the interface. The first
  version ran the calculation in the client. I later reused the same function
  in the server’s saveCalorieCalculation resolver. The client runs it to
  validate the inputs before submitting them, and the server calculates the
  result before writing it to MongoDB. The mutation accepts the measurements
  rather than a calorie total supplied by the browser. Reusing one function
  keeps the formula and validation consistent across both parts of the
  application.`,

  `I also connected the algorithm to persistent storage. Each account can
  save its latest age, sex, height in feet and inches, weight, estimated
  resting calories, maintenance calorie recommendation, and activity
  multiplier. The calorie page retrieves this record and uses it to populate
  the form and display the saved recommendation. A successful save updates
  the displayed record, while editing the form leaves the previous saved
  recommendation visible. This extends the usefulness of the algorithm
  without changing its mathematical formula.`,

  `One challenge was making the input process convenient while keeping the
  calculation consistent. I changed the height input to separate feet and
  inches fields and converted those values into total inches before passing
  them to the calculation function. The function then converts inches to
  centimeters and pounds to kilograms. I also added validation for missing
  fields, unsupported ages, and invalid measurements.`,

  `Eight unit tests passed after I corrected an inaccurate test case. The
  tests check expected calculation results, age boundaries, invalid inputs,
  and whether the function preserves the original input object. One test
  initially expected an exception even though its inputs produced a positive
  result. Recalculating the example and correcting the test data reinforced
  that expected results need to be verified as carefully as implementation
  code.`,

  `This enhancement supports Course Outcomes Three and Four through
  algorithmic problem solving, evaluation of design choices, and the use of
  appropriate development and testing tools. My original plan also considered
  activity selection and adjustments for losing, maintaining, or gaining
  weight. The implemented version estimates maintenance calories with a fixed
  sedentary multiplier. Those additional selections are outside the
  functionality demonstrated by this version.`,
];

export default function Algorithms() {
  return (
    <Paper
      component="section"
      id="algorithms"
      aria-labelledby="algorithms-heading"
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        scrollMarginTop: { xs: 24, md: 112 },
      }}
    >
      <Typography
        variant="overline"
        component="p"
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        Enhancement 02
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        id="algorithms-heading"
        sx={{
          mb: 3,
          color: '#152b43',
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        Algorithms and Data Structures
      </Typography>

      <Box sx={{ maxWidth: '80ch', mb: 3 }}>
        {paragraphs.map((paragraph, index) => (
          <Typography
            key={index}
            component="p"
            sx={{
              mb: 2.5,
              lineHeight: 1.8,
              '&:last-child': { mb: 0 },
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          href={`${repositoryUrl}/blob/main/client/src/utils/calorieCalculator.js`}
          sx={{ textTransform: 'none' }}
        >
          View calculation function
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/blob/main/client/tests/calorieCalculator.test.js`}
          sx={{ textTransform: 'none' }}
        >
          View unit tests
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/raw/refs/heads/main/4-2%20Milestone%203%20Narrative.docx`}
          sx={{ textTransform: 'none' }}
        >
          Download milestone narrative (.docx)
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        The downloadable narrative records the original milestone submission.
        The text above describes the scope presented in this portfolio.
      </Typography>
    </Paper>
  );
}