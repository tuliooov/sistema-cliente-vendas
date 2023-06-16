import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormCrudClient from "./FormCrudClient";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISchemaCrudClient, schemaAddClient } from "./schema";
import axios from "axios";
import { Typography } from "@mui/material";
import { IModal } from "../TableClientes";
import { IClientComplete } from "@/pages/api/clients/[id]";
import { mapperClientToForm } from "./func";
import { Loading } from "@/components/Loading";

interface ModalAddClientProps {
  refreshClients: () => void;
  modalSettings: IModal;
  handleModalSettings: (value: IModal) => void;
}

export default function ModalAddClient({
  refreshClients,
  handleModalSettings,
  modalSettings,
}: ModalAddClientProps) {
  const methods = useForm<ISchemaCrudClient>({
    resolver: zodResolver(schemaAddClient),
  });

  const sourceRef = useRef(axios.CancelToken.source());
  const isFirstRender = useRef(true);
  
  const [loading, setLoading] = useState(false);
  const [fetchingClient, setFetchingClient] = useState(
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
    refreshClients();
    handleClose(true)();
  };

  const onErrorSubmit = async (error: FieldErrors<ISchemaCrudClient>) => {
    console.warn(error);
  };

  const onSubmit = async (data: ISchemaCrudClient) => {
    console.log(data);
    try {
      setLoading(true);
      if (modalSettings.type === "add")
        await axios.post("/api/clients/create", data);
      if (modalSettings.type === "edit")
        await axios.put("/api/clients/update", data);
      handleFinishSubmit();
    } catch (error) {
      console.warn("Post client: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClient = useCallback(
    async (id: string) => {
      try {
        setFetchingClient(true);
        const response = await axios.get(`/api/clients/${id}`);
        if (!response.data.data.id) new Error("Cliente não encontrado");
        const client = response.data.data as IClientComplete;
        mapperClientToForm(client, methods.setValue);
      } catch (error) {
        console.warn("Get clients: ", error);
      } finally {
        setFetchingClient(false);
      }
    },
    [methods.setValue]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (fetchingClient && modalSettings.state?.id) {
      fetchClient(modalSettings.state.id);
    }
    return () => {
      sourceRef.current.cancel("Request canceled by cleanup");
    };
  }, [fetchClient, fetchingClient, modalSettings.state?.id, sourceRef]);

  const title = {
    add: "Adicionar cliente",
    edit: "Editar cliente",
    view: "Visualizar cliente",
    undefined: "Cliente",
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modalSettings.open}
        onClose={handleClose(false)}
        aria-labelledby="crud-client-form-dialog-title"
        aria-describedby="crud-client-form-dialog-description"
      >
        <DialogTitle id="crud-client-form-dialog-title">
          <Typography variant="h4" gutterBottom>
            {title[`${modalSettings.type}`]}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {fetchingClient && <Loading />}
          {!fetchingClient && (
            <FormCrudClient
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
