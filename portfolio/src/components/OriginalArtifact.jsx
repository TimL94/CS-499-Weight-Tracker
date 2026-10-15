import { Box, Button, Paper, Typography } from '@mui/material';

const repositoryUrl = 'https://github.com/TimL94/CS-499-Weight-Tracker';

const versions = [
  {
    title: 'Original Android application',
    description:
      'Built with Java, XML layouts, and SQLite. The application supports account creation, login, weight entries, and goal tracking.',
  },
  {
    title: 'Enhanced web application',
    description:
      'Built with React, Material UI, Node.js, Express, GraphQL, and MongoDB. The enhancements introduce a web architecture, a calorie calculator, and persistent database operations.',
  },
];

export default function OriginalArtifact() {
  return (
    <Paper
      component="section"
      id="original-artifact"
      aria-labelledby="original-artifact-heading"
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
        variant="h4"
        component="h2"
        id="original-artifact-heading"
        sx={{
          mb: 3,
          color: '#152b43',
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        Original Artifact: Weight Tracker
      </Typography>

      <Box sx={{ maxWidth: '80ch' }}>
        <Typography component="p" sx={{ mb: 2.5, lineHeight: 1.8 }}>
          I originally developed the Weight Tracker in June 2026 for CS 360,
          Mobile Architecture and Programming. The Android application allowed
          users to create an account, log in, record weight entries, edit or
          delete entries, and set a goal weight.
        </Typography>

        <Typography component="p" sx={{ mb: 3, lineHeight: 1.8 }}>
          I selected this artifact for my capstone because it provided a
          practical foundation for demonstrating growth across software design
          and engineering, algorithms and data structures, and databases. The
          enhanced application preserves its main purpose while expanding its
          architecture, computational functionality, and data management.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {versions.map((version) => (
          <Box
            key={version.title}
            sx={{
              p: 3,
              bgcolor: '#f3f6fa',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                mb: 1,
                color: '#152b43',
                fontWeight: 700,
              }}
            >
              {version.title}
            </Typography>

            <Typography component="p" sx={{ lineHeight: 1.8 }}>
              {version.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          href={`${repositoryUrl}/raw/refs/heads/main/WeightTracker.zip`}
          sx={{ textTransform: 'none' }}
        >
          Download original artifact (.zip)
        </Button>

        <Button
          variant="outlined"
          href={repositoryUrl}
          sx={{ textTransform: 'none' }}
        >
          View enhanced repository
        </Button>

        <Button
          variant="outlined"
          href={`${repositoryUrl}/archive/refs/heads/main.zip`}
          sx={{ textTransform: 'none' }}
        >
          Download repository (.zip)
        </Button>
      </Box>
    </Paper>
  );
}