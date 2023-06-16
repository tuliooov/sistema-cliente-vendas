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
import { IProductsOrder } from "@/pages/api/orders/products";

interface SelectProductProps {
  loading: boolean;
  disabledDefault: boolean;
  index: number;
  products?: IProductsOrder;
}

export default function SelectProduct({
  loading = false,
  disabledDefault,
  index,
  products,
}: SelectProductProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ISchemaCrudOrder>();

  const errorsProduct = errors.products ?? [];
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id={`product-${index}-select-label`}>Produtos</InputLabel>
          <Select
            labelId={`product-${index}-select-label`}
            id={`product-${index}-select-label`}
            onChange={(e) => {
              setValue(`products.${index}.productId`, e.target.value);
            }}
            value={watch(`products.${index}.productId`)}
            label="Produto"
            disabled={disabledDefault}
            error={!!errorsProduct[index]?.productId}
          >
            {products?.map((product) => (
              <MenuItem value={product.id} key={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
          {!!errorsProduct[index]?.productId && (
            <FormHelperText error>
              {errorsProduct[index]?.productId?.message}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    </>
  );
}
