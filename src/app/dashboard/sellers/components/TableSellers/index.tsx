"use client";

import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { ISellers } from "@/pages/api/seller";
import ModalAddSeller from "../ModalCrudSeller";
import { formattedDate } from "@/utils/formatDate";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { TableStyled } from "@/components/Table";
import { Loading } from "@/components/Loading";

export interface IModal {
  open: boolean;
  type?: "add" | "edit" | "view";
  state?: {
    id?: string;
  };
}

export default function TableSellers() {
  const [sellers, setSellers] = useState<ISellers>();
  const [loading, setLoading] = useState(true);
  const [modalSettings, setModalSettings] = useState<IModal>({
    open: false,
  });

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/seller");
      setSellers(response.data.data);
    } catch (error) {
      console.warn("Get sellers: ", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSellers = () => {
    fetchSellers();
  };

  useEffect(() => {
    fetchSellers();
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
          <Typography variant="h2" gutterBottom>
            Representantes
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button variant="contained" onClick={handleAdd}>
            Adicionar representante
          </Button>
          {modalSettings.open && (
            <ModalAddSeller
              refreshSellers={refreshSellers}
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
      {!loading && !!sellers?.length && (
        <TableStyled
          titles={["Nome", "Cidade", "Observação", "Data Cadastro", "Opções"]}
          data={sellers.map(({ id, name, address, observation, createdAt }) => {
            return [
              name,
              address?.city,
              observation,
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
          })}
        />
      )}
    </>
  );
}
