import * as React from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ISchemaCrudOrder } from "../schema";
import { useCallback, useEffect, useRef, useState } from "react";
import { IClientsOrders } from "@/pages/api/orders/clients";
import axios from "axios";

interface SelectClientProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function SelectClient({
  loading = false,
  disabledDefault,
}: SelectClientProps) {
  const isFirstRender = useRef(true);
  const [clients, setClients] = useState<IClientsOrders>();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ISchemaCrudOrder>();

  const fetchRequireds = useCallback(async () => {
    try {
      const clientsResponse = await axios.get(`/api/orders/clients`);

      setClients(clientsResponse.data.data || []);
    } catch (error) {
      console.warn("Get clients: ", error);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchRequireds();
  }, [fetchRequireds]);

  const disabled = disabledDefault || loading || clients === undefined;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="client-select-label">Cliente</InputLabel>
        <Select
          labelId="client-select-label"
          id="client-select"
          {...register("order.clientId")}
          value={watch("order.clientId")}
          label="Cliente"
          disabled={disabled}
          error={!!errors.order?.clientId}
        >
          {clients?.map((client) => (
            <MenuItem value={client.id} key={client.id}>
              {client.nameFantasy}
            </MenuItem>
          ))}
        </Select>
        {!!errors.order?.clientId && (
          <FormHelperText error>
            {errors.order?.clientId?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
