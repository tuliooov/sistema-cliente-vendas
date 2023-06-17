"use client";

import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { IOrders } from "@/pages/api/orders";
import ModalAddOrder from "../ModalCrudOrder";
import { formattedDate } from "@/utils/formatDate";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { TableStyled } from "@/components/Table";
import { Loading } from "@/components/Loading";
import { useUser } from "@/contexts/userContext";
import { ApproveButton } from "./ApproveButton";

export interface IModal {
  open: boolean;
  type?: "add" | "edit" | "view";
  state?: {
    id?: string;
    code?: string
  };
}

export default function TableOrders() {
  const { user } = useUser()
  const  ordersPage = user?.permissions?.ordersPage || {}

  const [orders, setOrders] = useState<IOrders>([]);
  const [loading, setLoading] = useState(true);
  const [modalSettings, setModalSettings] = useState<IModal>({
    open: false,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders`);
      setOrders(response.data.data);
    } catch (error) {
      console.warn("Get orders: ", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = () => {
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleModalSettings = (value: IModal) => {
    setModalSettings(value);
  };


  const handleEdit = (id?: string, code?: string) => () => {
    handleModalSettings({
      open: true,
      type: "edit",
      state: {
        id,
        code
      },
    });
  };

  const handleView = (id?: string, code?: string) => () => {
    handleModalSettings({
      open: true,
      type: "view",
      state: {
        id,
        code,
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
            Pedidos
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          <Button variant="contained" onClick={handleAdd}>
            Adicionar
          </Button>
          {modalSettings.open && (
            <ModalAddOrder
              refreshOrders={refreshOrders}
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
            "Código",
            "Cliente",
            "Representante",
            "Observação",
            "Total",
            "Data Cadastro",
            "Status",
            "Opções",
          ]}
          data={orders.map(({ id, code, client, seller, total, observation, status, createdAt }) => {
            return [
              code,
              client.nameFantasy,
              seller.name,
              observation,
              total,
              createdAt ? formattedDate(createdAt) : "-",
              status,
              <Stack direction="row" spacing={1} key={id}>
                <IconButton
                  aria-label="edit"
                  color="error"
                  onClick={handleEdit(id, code)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="visibility"
                  color="success"
                  onClick={handleView(id, code)}
                >
                  <VisibilityIcon />
                </IconButton>
                {
                  ordersPage?.approve && <ApproveButton
                  id={id}
                  refreshOrders={refreshOrders} 
                  status={status}
                  />
                }
              </Stack>,
            ];
          })}
        />
      )}
    </>
  );
}