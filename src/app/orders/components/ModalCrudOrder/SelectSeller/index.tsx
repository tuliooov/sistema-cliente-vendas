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
import { useCallback, useEffect, useState } from "react";
import { ISellersOrders } from "@/pages/api/orders/sellers";
import axios from "axios";

interface SelectSellerProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function SelectSeller({
  loading = false,
  disabledDefault,
}: SelectSellerProps) {
  const [sellers, setSellers] = useState<ISellersOrders>();

  const {
    register,
    formState: { errors },
  } = useFormContext<ISchemaCrudOrder>();

  const fetchRequireds = useCallback(async () => {
    try {
      const sellersResponse = await axios.get(`/api/orders/sellers`);

      setSellers(sellersResponse.data.data || []);
    } catch (error) {
      console.warn("Get Sellers: ", error);
    }
  }, []);

  useEffect(() => {
    fetchRequireds();
  }, [fetchRequireds]);

  const disabled = disabledDefault || loading || sellers === undefined;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="seller-select-label">Representante</InputLabel>
        <Select
          labelId="seller-select-label"
          id="seller-select"
          {...register("order.sellerId")}
          label="Representante"
          disabled={disabled}
          error={!!errors.order?.sellerId}
        >
          {sellers?.map((seller) => (
            <MenuItem value={seller.id} key={seller.id}>
              {seller.name}
            </MenuItem>
          ))}
        </Select>
        {!!errors.order?.sellerId && (
          <FormHelperText error>
            {errors.order?.sellerId?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
