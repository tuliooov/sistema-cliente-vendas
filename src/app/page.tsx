"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { ISchemaLogin } from "./schema";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useUser } from "@/contexts/userContext";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function SignInSide() {
  const {push} = useRouter();

  const { register, handleSubmit } = useForm<ISchemaLogin>();
  const [loading, setLoading] = React.useState(false);
  const { changeUser, logOut } = useUser()

  const onSubmit = async (data: ISchemaLogin) => {
    console.log(data)
    try {
      setLoading(true);
      const response = await axios.post("/api/oauth/login", data);
      await changeUser(response.data.data);
      push('/dashboard')
    } catch (error) {
      console.warn("Post login: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("logout");
    
    logOut()
  }, [logOut])

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(/wallpaper.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email")}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...register("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
              >
                Entrar
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
