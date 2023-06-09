import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ISchemaCrudProduct } from "./schema";

interface FormCrudProductProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function FormCrudProduct({
  loading = false,
  disabledDefault,
}: FormCrudProductProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISchemaCrudProduct>();

  const disabled = disabledDefault || loading;
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Produto
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="name"
              label="Produto"
              autoFocus
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register("stock", {
                valueAsNumber: true,
              })}
              error={!!errors.stock}
              helperText={errors.stock?.message}
              disabled={disabled}
              id="stock"
              fullWidth
              type={"number"}
              multiline
              label="Estoque"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
