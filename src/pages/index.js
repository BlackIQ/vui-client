import { Box, Typography, Grid } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        paddingTop: "5rem",
      }}
    >
      <Grid columns={{ xs: 6, md: 12 }} spacing={3} container>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          xs={6}
        >
          <Box>
            <Typography variant="h4" color="primary" gutterBottom>
              VUI
            </Typography>
            <Typography variant="body1">
              راه حلی مدرن برای دسترسی به اینترنت آزاد
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
