import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormCrudOrder from "./FormCrudOrder";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";
import { IModal } from "../TableOrders";
import { mapperOrderToForm } from "./func";
import { ISchemaCrudOrder, schemaAddOrder } from "./schema";
import { IOrderComplete } from "@/pages/api/orders/[id]";

interface ModalAddOrderProps {
  refreshOrders: () => void;
  modalSettings: IModal;
  handleModalSettings: (value: IModal) => void;
}

export default function ModalAddOrder({
  refreshOrders,
  handleModalSettings,
  modalSettings,
}: ModalAddOrderProps) {
  const methods = useForm<ISchemaCrudOrder>({
    resolver: zodResolver(schemaAddOrder),
  });

  const sourceRef = useRef(axios.CancelToken.source());

  const [loading, setLoading] = useState(false);
  const [fetchingOrder, setFetchingOrder] = useState(
    modalSettings.type !== "add"
  );

  const handleClose =
    (force = false) =>
    () => {
      if (!loading || force) {
        handleModalSettings({
          open: false,
        });
        methods.reset();
      }
    };

  const handleFinishSubmit = () => {
    refreshOrders();
    handleClose(true)();
  };

  const onErrorSubmit = async (error: FieldErrors<ISchemaCrudOrder>) => {
    console.warn(error);
  };

  const onSubmit = async (data: ISchemaCrudOrder) => {
    console.log(data);
    try {
      setLoading(true);
      if (modalSettings.type === "add")
        await axios.post("/api/orders/create", data);
      if (modalSettings.type === "edit")
        await axios.put("/api/orders/update", data);
      handleFinishSubmit();
    } catch (error) {
      console.warn("Post order: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = useCallback(
    async (id: string) => {
      try {
        setFetchingOrder(true);
        const response = await axios.get(`/api/orders/${id}`);
        if (!response.data.data.id) new Error("Representante não encontrado");
        const order = response.data.data as IOrderComplete;
        mapperOrderToForm(order, methods.setValue);
      } catch (error) {
        console.warn("Get order: ", error);
      } finally {
        setFetchingOrder(false);
      }
    },
    [methods.setValue]
  );

  useEffect(() => {
    if (fetchingOrder && modalSettings.state?.id) {
      fetchOrder(modalSettings.state.id);
    }
    return () => {
      sourceRef.current.cancel("Request canceled by cleanup");
    };
  }, [fetchOrder, fetchingOrder, modalSettings.state?.id, sourceRef]);

  const title = {
    add: "Adicionar pedido",
    edit: "Editar pedido",
    view: "Visualizar pedido",
    undefined: "Pedido",
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modalSettings.open}
        onClose={handleClose(false)}
        aria-labelledby="crud-order-form-dialog-title"
        aria-describedby="crud-order-form-dialog-description"
      >
        <DialogTitle id="crud-order-form-dialog-title">
          <Typography variant="h4" gutterBottom>
            {title[`${modalSettings.type}`]}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {fetchingOrder && <CircularProgress />}
          {!fetchingOrder && (
            <FormCrudOrder
              loading={loading}
              disabledDefault={modalSettings.type === "view"}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false)} disabled={loading}>
            Cancelar
          </Button>
          <LoadingButton
            autoFocus
            loading={loading}
            onClick={methods.handleSubmit(onSubmit, onErrorSubmit)}
          >
            Cadastrar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
