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
import { IProductsOrder } from "@/pages/api/orders/products";
import axios from "axios";

interface SelectProductProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function SelectProduct({
  loading = false,
  disabledDefault,
}: SelectProductProps) {
  const [products, setProducts] = useState<IProductsOrder>();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ISchemaCrudOrder>();

  const fetchRequireds = useCallback(async () => {
    try {
      const productsResponse = await axios.get(`/api/orders/products`);

      setProducts(productsResponse.data.data || []);
    } catch (error) {
      console.warn("Get products: ", error);
    }
  }, []);

  useEffect(() => {
    fetchRequireds();
  }, [fetchRequireds]);

  const disabled = disabledDefault || loading || products === undefined;
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="product-select-label">Produtos</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          {...register("products.productId")}
          value={watch("products.productId")}
          label="Produto"
          disabled={disabled}
          error={!!errors.products?.productId}
        >
          {products?.map((product) => (
            <MenuItem value={product.id} key={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        {!!errors.products?.productId && (
          <FormHelperText error>
            {errors.products?.productId?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
