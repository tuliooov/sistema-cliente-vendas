import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormCrudSeller from "./FormCrudSeller";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Typography } from "@mui/material";
import { IModal } from "../TableSellers";
import { mapperSellerToForm } from "./func";
import { ISellerComplete } from "@/pages/api/seller/[id]";
import { ISchemaCrudSeller, schemaAddSeller } from "./schema";
import { Loading } from "@/app/orders/components/Loading";

interface ModalAddSellerProps {
  refreshSellers: () => void;
  modalSettings: IModal;
  handleModalSettings: (value: IModal) => void;
}

export default function ModalAddSeller({
  refreshSellers,
  handleModalSettings,
  modalSettings,
}: ModalAddSellerProps) {
  const methods = useForm<ISchemaCrudSeller>({
    resolver: zodResolver(schemaAddSeller),
  });

  const sourceRef = useRef(axios.CancelToken.source());

  const [loading, setLoading] = useState(false);
  const [fetchingSeller, setFetchingSeller] = useState(
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
    refreshSellers();
    handleClose(true)();
  };

  const onErrorSubmit = async (error: FieldErrors<ISchemaCrudSeller>) => {
    console.warn(error);
  };

  const onSubmit = async (data: ISchemaCrudSeller) => {
    console.log(data);
    try {
      setLoading(true);
      if (modalSettings.type === "add")
        await axios.post("/api/seller/create", data);
      if (modalSettings.type === "edit")
        await axios.put("/api/seller/update", data);
      handleFinishSubmit();
    } catch (error) {
      console.warn("Post Seller: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeller = useCallback(
    async (id: string) => {
      try {
        setFetchingSeller(true);
        const response = await axios.get(`/api/seller/${id}`);
        if (!response.data.data.id) new Error("Representante não encontrado");
        const Seller = response.data.data as ISellerComplete;
        mapperSellerToForm(Seller, methods.setValue);
      } catch (error) {
        console.warn("Get Seller: ", error);
      } finally {
        setFetchingSeller(false);
      }
    },
    [methods.setValue]
  );

  useEffect(() => {
    if (fetchingSeller && modalSettings.state?.id) {
      fetchSeller(modalSettings.state.id);
    }
    return () => {
      sourceRef.current.cancel("Request canceled by cleanup");
    };
  }, [fetchSeller, fetchingSeller, modalSettings.state?.id, sourceRef]);

  const title = {
    add: "Adicionar Representante",
    edit: "Editar Representante",
    view: "Visualizar Representante",
    undefined: "Representante",
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modalSettings.open}
        onClose={handleClose(false)}
        aria-labelledby="crud-Seller-form-dialog-title"
        aria-describedby="crud-Seller-form-dialog-description"
      >
        <DialogTitle id="crud-Seller-form-dialog-title">
          <Typography variant="h4" gutterBottom>
            {title[`${modalSettings.type}`]}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {fetchingSeller && <Loading />}
          {!fetchingSeller && (
            <FormCrudSeller
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
