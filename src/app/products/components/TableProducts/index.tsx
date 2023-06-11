"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { IProducts } from "@/pages/api/products";
import ModalAddProduct from "../ModalCrudProduct";
import { formattedDate } from "@/utils/formatDate";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export interface IModal {
  open: boolean;
  type?: "add" | "edit" | "view";
  state?: {
    id?: string;
  };
}

export default function TableProducts() {
  const [products, setProducts] = useState<IProducts>();
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
          <Button variant="contained" onClick={handleAdd}>
            Adicionar produtos
          </Button>
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
          <CircularProgress />
        </>
      )}
      {!loading && !!products?.length && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="right">Estoque</StyledTableCell>
                <StyledTableCell align="right">Data Cadastro</StyledTableCell>
                <StyledTableCell align="right">Opções</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(({ id, name, stock, createdAt }) => (
                <StyledTableRow key={id}>
                  <StyledTableCell component="th" scope="row">
                    {name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{stock}</StyledTableCell>
                  <StyledTableCell align="right">
                    {formattedDate(createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={1}>
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
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
