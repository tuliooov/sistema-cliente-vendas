import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ISchemaCrudSeller } from "./schema";

interface FormCrudSellerProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function FormCrudSeller({
  loading = false,
  disabledDefault,
}: FormCrudSellerProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISchemaCrudSeller>();

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
              Representante
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="name"
              label="Representante"
              autoFocus
              {...register("seller.name")}
              error={!!errors.seller?.name}
              helperText={errors.seller?.name?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="phone"
              label="Telefone"
              {...register("seller.phone")}
              error={!!errors.seller?.phone}
              helperText={errors.seller?.phone?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              {...register("seller.email")}
              error={!!errors.seller?.email}
              helperText={errors.seller?.email?.message}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("seller.cnpj")}
              error={!!errors.seller?.cnpj}
              helperText={errors.seller?.cnpj?.message}
              disabled={disabled}
              fullWidth
              id="cnpj"
              label="CPF/CNPJ"
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
              {...register("address.street")}
              error={!!errors.address?.street}
              helperText={errors.address?.street?.message}
              disabled={disabled}
              id="street"
              fullWidth
              label="Rua"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("address.number")}
              error={!!errors.address?.number}
              helperText={errors.address?.number?.message}
              disabled={disabled}
              id="number"
              fullWidth
              label="Numero"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("address.district")}
              error={!!errors.address?.district}
              helperText={errors.address?.district?.message}
              disabled={disabled}
              id="district"
              fullWidth
              label="Bairro"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("address.city")}
              error={!!errors.address?.city}
              helperText={errors.address?.city?.message}
              disabled={disabled}
              id="city"
              fullWidth
              label="Cidade"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("address.state")}
              error={!!errors.address?.state}
              helperText={errors.address?.state?.message}
              disabled={disabled}
              id="state"
              fullWidth
              label="Estado"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("address.cep")}
              error={!!errors.address?.cep}
              helperText={errors.address?.cep?.message}
              disabled={disabled}
              id="cep"
              fullWidth
              label="CEP"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Observação
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register("seller.observation")}
              error={!!errors.seller?.observation}
              helperText={errors.seller?.observation?.message}
              disabled={disabled}
              id="observation"
              fullWidth
              multiline
              label="Observação"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
