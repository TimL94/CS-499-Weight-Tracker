import { Box, Button, Paper, Typography } from '@mui/material';

const repositoryUrl = 'https://github.com/TimL94/CS-499-Weight-Tracker';

const paragraphs = [
  `For the database enhancement, I replaced temporary storage in the Weight
  Tracker web application with persistent MongoDB operations. The project
  began as my Android Weight Tracker from CS 360. I first connected the web
  version to local MongoDB and later moved the hosted database to MongoDB
  Atlas for the application deployed on Render. I selected this artifact
  because it supports my focus on full stack development and provides
  practical opportunities to demonstrate database design and secure data
  management.`,

  `Before this enhancement, users, weight entries, goals, and calorie entries
  were stored in temporary arrays that reset when the server restarted. I
  completed the database connection and models for User, WeightEntry, Goal,
  and CalorieEntry. I later added a fifth model, CalorieCalculation, to store
  the calculator’s inputs and results. The server waits for a successful
  database connection before starting the API, and the connection string
  is supplied through an environment variable.`,

  `The models define the structure and validation rules for each record.
  Weight entries, goals, and calorie entries reference the user who owns them.
  Unique indexes prevent duplicate usernames and limit each user to one goal
  record and one saved calorie calculation. I updated the existing GraphQL
  resolvers to use the database while
  preserving the application’s field names and interface. Weight entries can
  be created, retrieved, updated, and deleted. Goals can be created or updated,
  and calorie entries can be created and retrieved. I also added validation
  for actual calendar dates.`,

  `The saved calculation contains the user’s age, sex, height in feet and
  inches, weight, estimated resting calories, maintenance calorie
  recommendation, and activity multiplier. The save mutation calculates
  the result on the server and uses an upsert to create the user’s first
  calculation or update the existing record. The query retrieves that
  user’s saved calculation when the calorie page opens. This preserves
  the latest calculation across page visits without creating a history
  record for every submission.`,

  `This enhancement supports Course Outcomes Four and Five. For Outcome Four,
  I applied MongoDB, Mongoose, and GraphQL to implement persistent storage for
  a working application. For Outcome Five, I preserved password hashing and
  JWT verification while using the authenticated user’s identity to restrict
  database operations. Weight updates and deletions include both the record
  ID and the user’s ID in their database filters. Saved calculation queries
  and updates also use the authenticated user’s ID from the server context.
  The browser does not choose which account’s calculation to read or update.`,

  `I also added Apollo cache clearing during login, registration, and logout
  to prevent previously cached account data from appearing when switching
  users. For the saved calculator, a successful mutation updates Apollo’s
  saved-calculation query so the page can display the returned recommendation.
  Opening the calorie page requests the stored record from the server.
  This helped me understand the separate responsibilities of the database,
  the client cache, and the form’s temporary editing state.`,

  `One challenge was connecting the database setup to the server startup
  process. Creating the connection function alone was not enough; the server
  also needed to import and await it. Another challenge was replacing numeric
  IDs from the temporary arrays with MongoDB IDs. This reinforced the
  importance of checking assumptions throughout the application when changing
  how data is stored.`,

  `During the database milestone, I verified persistence by inspecting
  records in MongoDB Compass and testing the application. The checks included
  editing and deleting weight
  entries, switching between two accounts, and confirming that saved records
  remained available after restarting the server. After deployment, I checked
  Atlas and confirmed that the hosted application could add and update records.
  Moving from temporary arrays to local MongoDB and then Atlas gave me
  experience with persistent storage in both development and deployment
  environments.`,
];

export default function Databases() {
  return (
    <Paper
      component="section"
      id="databases"
      aria-labelledby="databases-heading"
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
        Enhancement 03
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        id="databases-heading"
        sx={{
          mb: 3,
          color: '#152b43',
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        Databases
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
          href={`${repositoryUrl}/tree/main/server/models`}
          sx={{ textTransform: 'none' }}
        >
          View database models
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/blob/main/server/graphql/resolvers.js`}
          sx={{ textTransform: 'none' }}
        >
          View GraphQL resolvers
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/raw/refs/heads/main/5-2%20Milestone%204%20Narrative.docx`}
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
        The text above reflects the database implementation presented in this
        portfolio.
      </Typography>
    </Paper>
  );
}