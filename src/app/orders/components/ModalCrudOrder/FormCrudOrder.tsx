import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ISchemaCrudOrder } from "./schema";
import SelectClient from "./SelectClient";
import SelectSeller from "./SelectSeller";
import SelectProduct from "./SelectProduct";

interface FormCrudOrderProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function FormCrudOrder({
  loading = false,
  disabledDefault,
}: FormCrudOrderProps) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<ISchemaCrudOrder>();
  const disabled = disabledDefault || loading;
  console.log(getValues());

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
              Pedido
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectClient disabledDefault={disabledDefault} loading={loading} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectSeller disabledDefault={disabledDefault} loading={loading} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SelectProduct
              disabledDefault={disabledDefault}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("products.quantidity", {
                valueAsNumber: true,
              })}
              error={!!errors.products?.quantidity}
              helperText={errors.products?.quantidity?.message}
              disabled={disabled}
              id="products.quantidity"
              fullWidth
              type={"number"}
              multiline
              label="Quantidade"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("products.value", {
                valueAsNumber: true,
              })}
              error={!!errors.products?.value}
              helperText={errors.products?.value?.message}
              disabled={disabled}
              id="products.value"
              fullWidth
              type={"number"}
              multiline
              label="Valor"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register("order.observation")}
              error={!!errors.order?.observation}
              helperText={errors.order?.observation?.message}
              disabled={disabled}
              id="observation"
              fullWidth
              multiline
              label="Pedido"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deliveryAddress.street")}
              error={!!errors.deliveryAddress?.street}
              helperText={errors.deliveryAddress?.street?.message}
              disabled={disabled}
              id="street"
              fullWidth
              label="Rua"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deliveryAddress.number")}
              error={!!errors.deliveryAddress?.number}
              helperText={errors.deliveryAddress?.number?.message}
              disabled={disabled}
              id="number"
              fullWidth
              label="Numero"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deliveryAddress.district")}
              error={!!errors.deliveryAddress?.district}
              helperText={errors.deliveryAddress?.district?.message}
              disabled={disabled}
              id="district"
              fullWidth
              label="Bairro"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deliveryAddress.city")}
              error={!!errors.deliveryAddress?.city}
              helperText={errors.deliveryAddress?.city?.message}
              disabled={disabled}
              id="city"
              fullWidth
              label="Cidade"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deliveryAddress.state")}
              error={!!errors.deliveryAddress?.state}
              helperText={errors.deliveryAddress?.state?.message}
              disabled={disabled}
              id="state"
              fullWidth
              label="Estado"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
