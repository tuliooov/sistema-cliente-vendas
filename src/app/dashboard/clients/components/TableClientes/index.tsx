"use client";

import * as React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IClients } from "@/pages/api/clients";
import ModalAddClient from "../ModalCrudClient";
import { TableStyled } from "@/components/Table";
import { formattedDate } from "@/utils/formatDate";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Loading } from "@/components/Loading";

export interface IModal {
  open: boolean;
  type?: "add" | "edit" | "view";
  state?: {
    id?: string;
  };
}

export default function TableClientes() {
  const [clients, setClients] = useState<IClients>([]);
  const [loading, setLoading] = useState(true);
  const [modalSettings, setModalSettings] = useState<IModal>({
    open: false,
  });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/clients");
      setClients(response.data.data);
    } catch (error) {
      console.warn("Get clients: ", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshClients = () => {
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleModalSettings = (value: IModal) => {
    setModalSettings(value);
  };

  const handleEdit = (id?: string) => () => {
    handleModalSettings({
      open: true,
      type: "edit",
      state: {
        id,
      },
    });
  };

  const handleView = (id?: string) => () => {
    handleModalSettings({
      open: true,
      type: "view",
      state: {
        id,
      },
    });
  };

  const handleAdd = () => {
    handleModalSettings({
      open: true,
      type: "add",
    });
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <Typography variant="h2" gutterBottom color="text.primary">
            Clientes
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
          {modalSettings.open && (
            <ModalAddClient
              refreshClients={refreshClients}
              modalSettings={modalSettings}
              handleModalSettings={handleModalSettings}
            />
          )}
        </Grid>
      </Grid>
      {loading && (
        <>
          <Loading />
        </>
      )}
      {!loading && (
        <TableStyled
          titles={[
            "Empresa",
            "Responsável",
            "Telefone",
            "Email",
            "CPF/CNPJ",
            "Data Cadastro",
            "Opções",
          ]}
          data={clients.map(
            ({
              id,
              nameFantasy,
              responsible,
              phone,
              email,
              cnpj,
              createdAt,
            }) => {
              return [
                nameFantasy,
                responsible,
                phone,
                email,
                cnpj,
                formattedDate(createdAt),
                <Stack direction="row" spacing={1} key={id}>
                  <IconButton
                    aria-label="edit"
                    color="error"
                    onClick={handleEdit(id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="visibility"
                    color="success"
                    onClick={handleView(id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Stack>,
              ];
            }
          )}
        />
      )}
    </>
  );
}
