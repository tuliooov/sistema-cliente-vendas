import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormCrudProduct from "./FormCrudProduct";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";
import { IModal } from "../TableProducts";
import { mapperProductToForm } from "./func";
import { IProductComplete } from "@/pages/api/products/[id]";
import { ISchemaCrudProduct, schemaAddProduct } from "./schema";

interface ModalAddProductProps {
  refreshProducts: () => void;
  modalSettings: IModal;
  handleModalSettings: (value: IModal) => void;
}

export default function ModalAddProduct({
  refreshProducts,
  handleModalSettings,
  modalSettings,
}: ModalAddProductProps) {
  const methods = useForm<ISchemaCrudProduct>({
    resolver: zodResolver(schemaAddProduct),
  });

  const sourceRef = useRef(axios.CancelToken.source());

  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(
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
    refreshProducts();
    handleClose(true)();
  };

  const onErrorSubmit = async (error: FieldErrors<ISchemaCrudProduct>) => {
    console.warn(error);
  };

  const onSubmit = async (data: ISchemaCrudProduct) => {
    console.log(data);
    try {
      setLoading(true);
      if (modalSettings.type === "add")
        await axios.post("/api/products/create", data);
      if (modalSettings.type === "edit")
        await axios.put("/api/products/update", data);
      handleFinishSubmit();
    } catch (error) {
      console.warn("Post Product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = useCallback(
    async (id: string) => {
      try {
        setFetchingProduct(true);
        const response = await axios.get(`/api/products/${id}`);
        if (!response.data.data.id) new Error("Produto não encontrado");
        const product = response.data.data as IProductComplete;
        mapperProductToForm(product, methods.setValue);
      } catch (error) {
        console.warn("Get product: ", error);
      } finally {
        setFetchingProduct(false);
      }
    },
    [methods.setValue]
  );

  useEffect(() => {
    if (fetchingProduct && modalSettings.state?.id) {
      fetchProduct(modalSettings.state.id);
    }
    return () => {
      sourceRef.current.cancel("Request canceled by cleanup");
    };
  }, [fetchProduct, fetchingProduct, modalSettings.state?.id, sourceRef]);

  const title = {
    add: "Adicionar Produto",
    edit: "Editar Produto",
    view: "Visualizar Produto",
    undefined: "Produto",
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modalSettings.open}
        onClose={handleClose(false)}
        aria-labelledby="crud-product-form-dialog-title"
        aria-describedby="crud-product-form-dialog-description"
      >
        <DialogTitle id="crud-product-form-dialog-title">
          <Typography variant="h4" gutterBottom>
            {title[`${modalSettings.type}`]}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {fetchingProduct && <CircularProgress />}
          {!fetchingProduct && (
            <FormCrudProduct
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
