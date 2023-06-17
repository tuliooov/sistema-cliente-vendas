"use client";

import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { IProducts } from "@/pages/api/products";
import ModalAddProduct from "../ModalCrudProduct";
import { formattedDate } from "@/utils/formatDate";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { TableStyled } from "@/components/Table";
import { Loading } from "@/components/Loading";
import { useUser } from "@/contexts/userContext";
export interface IModal {
  open: boolean;
  type?: "add" | "edit" | "view";
  state?: {
    id?: string;
  };
}

export default function TableProducts() {
  const { user } = useUser();
  
  const productsPage = user?.permissions?.productsPage || {}

  const [products, setProducts] = useState<IProducts>([]);
  const [loading, setLoading] = useState(true);
  const [modalSettings, setModalSettings] = useState<IModal>({
    open: false,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      setProducts(response.data.data);
    } catch (error) {
      console.warn("Get products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
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
            Produtos
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="end">
          {productsPage.create && (
            <Button variant="contained" onClick={handleAdd}>
              Adicionar
            </Button>
          )}
          {modalSettings.open && (
            <ModalAddProduct
              refreshProducts={refreshProducts}
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
          titles={["Nome", "Estoque", "Data Cadastro", "Opções"]}
          data={products.map(({ id, name, stock, createdAt }) => {
            return [
              name,
              stock,
              formattedDate(createdAt),
              <Stack direction="row" spacing={1} key={id}>
                {productsPage.update && (
                  <IconButton
                    aria-label="edit"
                    color="error"
                    onClick={handleEdit(id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                {productsPage.view && (
                  <IconButton
                    aria-label="visibility"
                    color="success"
                    onClick={handleView(id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                )}
              </Stack>,
            ];
          })}
        />
      )}
    </>
  );
}
