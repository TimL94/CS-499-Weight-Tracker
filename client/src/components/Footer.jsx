import {
  Box,
  Typography,
} from "@mui/material";

// Displays the shared application footer.
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        backgroundColor:
          "background.paper",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Weight Tracker
      </Typography>
    </Box>
  );
}

export default Footer;