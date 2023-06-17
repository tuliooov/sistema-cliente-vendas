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
import { ISchemaLogin, schemaLogin } from "./schema";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { IBusiness } from "@/pages/api/oauth/business";
import { ThemeModeEnum, useTheme } from "@/contexts/themeContext";

export default function SignInSide() {
  const { push } = useRouter();
  const {modeTheme} = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchemaLogin>({
    resolver: zodResolver(schemaLogin),
  });
  const [business, setBusiness] = useState<IBusiness[]>([]);
  const [loading, setLoading] = useState(false);
  const { changeUser, logOut } = useUser();

  const onSubmit = async (data: ISchemaLogin) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post("/api/oauth/login", data);
      await changeUser(response.data.data);
      push("/dashboard");
    } catch (error) {
      console.warn("Post login: ", error);
      setLoading(false);
    }
  };

  const fetchBusiness = async () => {
    try {
      const response = await axios.get("/api/oauth/business");
      console.log(
        "🚀 ~ file: page.tsx:55 ~ fetchBusiness ~ response:",
        response
      );
      setBusiness(response.data.data);
    } catch (error) {
      console.warn("get business: ", error);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  useEffect(() => {
    logOut();
  }, [logOut]);

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
            backgroundColor: (t) =>
              modeTheme === ThemeModeEnum.light
                ? t.palette.grey[50]
                : t.palette.grey[900],
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

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" error={!!errors.business?.message}>Empresa</InputLabel>
                <Select
                  labelId={`business-select-label`}
                  id={`business-select-label`}
                  {...register("business")}
                  label="Empresa"
                  error={!!errors.business?.message}
                >
                  {business?.map((item) => (
                    <MenuItem value={item.business} key={item.business}>
                      {item.business}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.business?.message && (
                  <FormHelperText error>
                    {errors.business.message}
                  </FormHelperText>
                )}
              </FormControl>
              <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
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
