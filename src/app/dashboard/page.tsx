"use client"

import { Grid, Typography } from "@mui/material";

export default function Dashboard() {
  return <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography variant="h2" gutterBottom color="text.primary">
            Dashboard
          </Typography>
        </Grid>
      </Grid>
  </div>
}
