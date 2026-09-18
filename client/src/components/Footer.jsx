import {
  Box,
  Typography,
} from "@mui/material";

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