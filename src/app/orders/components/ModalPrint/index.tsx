import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IModal } from "../TableOrders";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider, Typography } from "@mui/material";
import { IOrderComplete } from "@/pages/api/orders/[id]";
import { createPortal } from "react-dom";

interface ModalPrintProps {
  order: IOrderComplete;
}

export default function ModalPrint({ order }: ModalPrintProps) {
  return (
    <>
      {createPortal(
        <Dialog
          className="show-only-print"
          open={true}
          aria-labelledby="modal-print-order-form-dialog-title"
          aria-describedby="modal-print-order-form-dialog-description"
        >
          <DialogTitle id="modal-print-order-form-dialog-title">
            <Typography variant="h4" gutterBottom>
              Pedido - {order.code}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Container component="main">
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
                      Cliente
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Nome"
                      value={order.client.nameFantasy}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Telefone"
                      value={order.client.phone}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Responsavel"
                      value={order.client.responsible}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="CPF/CNPJ"
                      value={order.client.cnpj}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Representante
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Nome"
                      value={order.seller.name}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Telefone"
                      value={order.seller.phone}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Cidade"
                      value={order.seller.address?.city}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="CPF/CNPJ"
                      value={order.seller.cnpj}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Pedido
                    </Typography>
                  </Grid>
                  {order.productOrder.map((product) => (
                    <>
                      <Grid item xs={6} sm={6} md={6}>
                        <TextField
                          fullWidth
                          label="Produto"
                          value={product.product?.name}
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3}>
                        <TextField
                          fullWidth
                          label="Quantidade"
                          value={product.quantidity}
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3}>
                        <TextField
                          fullWidth
                          label="Valor"
                          value={product.value}
                        />
                      </Grid>
                    </>
                  ))}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Endereço de entrega
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Rua"
                      value={order.deliveryAddress.street}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Número"
                      value={order.deliveryAddress.number}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Bairro"
                      value={order.deliveryAddress.district}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Cidade"
                      value={order.deliveryAddress.city}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="Estado"
                      value={order.deliveryAddress.state}
                    />
                  </Grid>
                  <Grid item xs={3} sm={3} md={3}>
                    <TextField
                      fullWidth
                      label="CEP"
                      value={order.deliveryAddress.cep}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </DialogContent>
        </Dialog>,
        document.body
      )}
    </>
  );
}
