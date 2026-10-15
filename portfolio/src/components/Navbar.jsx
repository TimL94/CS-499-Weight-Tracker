import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink, NavLink } from 'react-router';

const navigationLinks = [
  { label: 'Self-Assessment', to: '/' },
  { label: 'Original Artifact', to: '/original-artifact' },
  { label: 'Software Design', to: '/software-design' },
  { label: 'Algorithms', to: '/algorithms' },
  { label: 'Databases', to: '/databases' },
];

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#152b43',
        position: { xs: 'static', md: 'sticky' },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'inherit',
              fontWeight: 700,
              textDecoration: 'none',
              flexShrink: 0,
              '&:focus-visible': {
                outline: '2px solid white',
                outlineOffset: 4,
              },
            }}
          >
            Timothy Lee
          </Typography>

          <Box
            component="nav"
            aria-label="Portfolio navigation"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.5,
            }}
          >
            {navigationLinks.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                end
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&.active': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                  },
                  '&:focus-visible': {
                    outline: '2px solid white',
                    outlineOffset: 2,
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
              <Button
                component="a"
                href="https://cs-499-weight-tracker.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Live Deployment
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
