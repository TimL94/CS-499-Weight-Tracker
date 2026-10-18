import { Box, Button, Paper, Typography } from '@mui/material';

const repositoryUrl = 'https://github.com/TimL94/CS-499-Weight-Tracker';

const paragraphs = [
  `For my Software Design and Engineering enhancement, I selected the Android
  Weight Tracker application that I originally created in CS 360. The original
  application allowed users to create an account, log in, record weight entries,
  edit or delete entries, and set a goal weight. I rebuilt the application for
  the web while preserving its main purpose and functionality. This artifact
  supports my focus on full stack development and demonstrates my ability to
  adapt an existing project to a different platform and architecture.`,

  `The enhanced version uses React for the client and Node.js with Express for
  the server. React Router handles navigation between the login, account
  creation, weight log, goal, add weight, and calorie tracking pages. Separating
  the client and server gives each part a clearer responsibility and makes it
  easier to work on the interface and application operations independently.`,

  `I added Material UI because I find it intuitive and easy to use. Its reusable
  components helped me create forms, buttons, cards, tables, navigation elements,
  and alerts without relying on a large amount of separate CSS. Its styling
  properties and breakpoint support also made it easier to adapt the interface
  to different screen sizes.`,

  `The client communicates with the server through GraphQL using Apollo Client
  and Apollo Server. Queries and mutations support account creation, login,
  weight tracking, goal tracking, and calorie tracking. I also used bcrypt to
  hash passwords and JWT authentication to identify the logged-in user.
  Protected routes control access to private pages, while protected server
  operations use the verified user identity to restrict access to account data.`,

  `I improved the route guard to check for missing, malformed, and expired
  tokens and to check the session again when a token expires. I also removed
  the separate loggedIn flag from local storage. These browser checks guide
  navigation, while the server verifies the token’s signature and expiration
  before allowing protected operations. This distinction helped me understand
  why a client login check cannot replace server authorization.`,

  `One challenge involved Apollo Client caching. After adding a weight entry,
  the server stored the data correctly, but the Weight Log did not immediately
  display the new value until the page was refreshed. I corrected the query
  behavior so the page retrieves current data from the server when it loads.
  I applied the same attention to data flow when adding saved calorie
  calculations. CalorieLog loads the saved inputs and recommendation, and
  the calculator updates that cached query after a successful save. A separate
  card displays the saved recommendation while the form remains available
  for editing. This keeps the saved result visible until new values are
  successfully saved.`,

  `During the initial software engineering milestone, I created the calorie
  tracking interface and database file structure as foundations for later
  enhancements. The application now includes the calorie calculator described
  in the algorithms section and the persistent MongoDB operations described
  in the database section. Saving the calculator inputs and result required
  connecting the form, page display, GraphQL operations, and database model.
  Completing the work in stages helped me understand how a feature can affect
  several parts of an application.`,

  `I deployed the full application through Render and connected it to MongoDB
  Atlas. Express serves the built React application and supports direct
  navigation to React Router pages. Environment variables provide the database
  connection, JWT secret, and deployment configuration. Working through build
  and startup issues gave me experience with the differences between running
  the application locally and maintaining a hosted version. The GitHub Pages
  ePortfolio provides access to the project documentation, source code, and
  live application.`,

  `This enhancement supports Course Outcomes Two, Four, and Five through
  technical communication, software design, appropriate development tools,
  and a security mindset.
  It demonstrates my ability to organize a full stack application, explain
  architectural decisions, and troubleshoot behavior across multiple
  application layers. The experience strengthened both my implementation
  skills and my understanding of how design choices affect maintainability
  and the user experience.`,
];

export default function SoftwareDesign() {
  return (
    <Paper
      component="section"
      id="software-design"
      aria-labelledby="software-design-heading"
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
        Enhancement 01
      </Typography>

      <Typography
        variant="h4"
        component="h2"
        id="software-design-heading"
        sx={{
          mb: 3,
          color: '#152b43',
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        Software Design and Engineering
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
          href={`${repositoryUrl}/tree/main/client/src`}
          sx={{ textTransform: 'none' }}
        >
          View client source
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/tree/main/server`}
          sx={{ textTransform: 'none' }}
        >
          View server source
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/raw/refs/heads/main/3-2%20Milestone%202%20Narrative.docx`}
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
        The text above reflects the completed capstone implementation.
      </Typography>
    </Paper>
  );
}