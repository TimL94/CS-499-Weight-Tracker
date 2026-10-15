import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import {
  Box,
  Container,
  CssBaseline,
  Link,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navbar from './components/navbar';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#152b43',
    },
    background: {
      default: '#f3f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#263445',
      secondary: '#536477',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

export default function App() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box id="top" sx={{ minHeight: '100vh' }}>
        <Link
          component="button"
          type="button"
          onClick={() => mainRef.current?.focus()}
          sx={{
            position: 'absolute',
            top: -80,
            left: 16,
            zIndex: 1400,
            p: 1.5,
            bgcolor: 'background.paper',
            borderRadius: 1,
            '&:focus': { top: 16 },
          }}
        >
          Skip to main content
        </Link>

        <Box
          component="header"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: { xs: 5, md: 8 },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="p"
              sx={{
                mb: 1.5,
                color: '#b7d6f3',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Southern New Hampshire University · CS 499
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem' },
              }}
            >
              Timothy Lee
            </Typography>

            <Typography
              component="p"
              sx={{
                mb: 2,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Computer Science ePortfolio
            </Typography>

            <Typography
              component="p"
              sx={{
                maxWidth: 700,
                color: '#d7e3ef',
                lineHeight: 1.8,
              }}
            >
              Software Engineering concentration. A collection of my work in
              full stack development, algorithmic problem solving, and secure
              database design.
            </Typography>
          </Container>
        </Box>

        <Navbar />

        <Container
          ref={mainRef}
          component="main"
          id="main-content"
          tabIndex={-1}
          maxWidth="lg"
          sx={{
            py: { xs: 3, md: 5 },
            scrollMarginTop: { xs: 24, md: 112 },
          }}
        >
          <Outlet />
        </Container>

        <Box
          component="footer"
          sx={{
            pb: 4,
            px: 2,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            Timothy Lee · Computer Science ePortfolio · 2026
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            <Link
              component="button"
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: 'auto' })
              }
            >
              Back to top
            </Link>

            <Link href="https://github.com/TimL94/CS-499-Weight-Tracker">
              Project repository
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}