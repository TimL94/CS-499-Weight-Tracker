import { Box, Button, Paper, Typography } from '@mui/material';

const repositoryUrl = 'https://github.com/TimL94/CS-499-Weight-Tracker';

const paragraphs = [
  `For the database enhancement, I connected the Weight Tracker web application
  to a local MongoDB database and replaced temporary storage with persistent
  database operations. I selected this artifact because it supports my focus
  on full stack development and provides practical opportunities to demonstrate
  database design and secure data management.`,

  `Before this enhancement, users, weight entries, goals, and calorie entries
  were stored in temporary arrays that reset when the server restarted. I
  completed the database connection and four Mongoose models so these records
  could be stored and retrieved from MongoDB. The server now waits for a
  successful database connection before starting the API.`,

  `The models define the structure and validation rules for each record.
  Weight entries, goals, and calorie entries reference the user who owns them.
  Unique indexes prevent duplicate usernames and limit each user to one goal
  record. I updated the existing GraphQL resolvers to use the database while
  preserving the application’s field names and interface. Weight entries can
  be created, retrieved, updated, and deleted. Goals can be created or updated,
  and calorie entries can be created and retrieved. I also added validation
  for actual calendar dates.`,

  `This enhancement supports Course Outcomes Four and Five. For Outcome Four,
  I applied MongoDB, Mongoose, and GraphQL to implement persistent storage for
  a working application. For Outcome Five, I preserved password hashing and
  JWT verification while using the authenticated user’s identity to restrict
  database operations. Weight updates and deletions include both the record
  ID and the user’s ID in their database filters.`,

  `I also added Apollo cache clearing during login, registration, and logout
  to prevent previously cached account data from appearing when switching
  users. This helped me understand that protecting user information involves
  both server access controls and client data handling. Authentication alone
  does not address every place where account data may remain available in
  the interface.`,

  `One challenge was connecting the database setup to the server startup
  process. Creating the connection function alone was not enough; the server
  also needed to import and await it. Another challenge was replacing numeric
  IDs from the temporary arrays with MongoDB IDs. This reinforced the
  importance of checking assumptions throughout the application when changing
  how data is stored.`,

  `I verified the enhancement by inspecting records in MongoDB Compass and
  testing the application. The checks included editing and deleting weight
  entries, switching between two accounts, and confirming that saved records
  remained available after restarting the server. These checks passed. The
  implementation presented here uses local MongoDB. MongoDB Atlas hosting,
  deployment of the full application, and calorie entry editing and deletion
  are not included in this version.`,
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