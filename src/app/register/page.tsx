"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ISchemaRegisterBusiness, schemaRegister } from "./schema";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchemaRegisterBusiness>({
    resolver: zodResolver(schemaRegister),
  });
  const [loading, setLoading] = useState(false);
  const { changeUser } = useUser();

  const onSubmit = async (data: ISchemaRegisterBusiness) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("/api/oauth/business/create", data);
      console.log("🚀 ~ file: page.tsx:49 ~ onSubmit ~ response:", response)
      await changeUser(response.data.data);
      push("/dashboard");
    } catch (error) {
      console.warn("Post register business: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={5}
          md={8}
          sx={{
            backgroundImage: "url(/wallpaper.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square> 
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              display={"flex"}
              flexDirection={"column"}
              gap={"2rem"}
              width={"100%"}
              sx={{mt: 2}}
            >
              <TextField
                {...register("business")}
                fullWidth
                id="business"
                label="Nome empresa"
                name="business"
                autoFocus
                error={!!errors.business?.message}
                helperText={errors.business?.message}
              />
              <TextField
                {...register("userName")}
                fullWidth
                id="userName"
                label="Nome administrador"
                name="userName"
                autoFocus
                error={!!errors.userName?.message}
                helperText={errors.business?.message}
              />
              <TextField
                {...register("urlLogo")}
                fullWidth
                name="urlLogo"
                label="URL Logo"
                id="urlLogo"
                error={!!errors.urlLogo?.message}
                helperText={errors.urlLogo?.message}
              />
              <TextField
                {...register("email")}
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email?.message}
                helperText={errors.email?.message}
              />
              <TextField
                {...register("password")}
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
              <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                loading={loading}
              >
                Cadastrar
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
