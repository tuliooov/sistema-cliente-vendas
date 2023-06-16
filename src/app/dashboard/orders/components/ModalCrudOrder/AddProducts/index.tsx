import * as React from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ISchemaCrudOrder } from "../schema";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SelectProduct from "../SelectProduct";
import { IProductsOrder } from "@/pages/api/orders/products";

interface AddProductsProps {
  loading: boolean;
  disabledDefault: boolean;
}

export default function AddProducts({
  loading = false,
  disabledDefault,
}: AddProductsProps) {
  const [products, setProducts] = useState<IProductsOrder>();

  const {
    setValue,
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

  const productsLength = watch("products").length;

  return (
    <>
      <Grid container spacing={2}>
        {Array.from(Array(productsLength + 1).keys()).map((index) => {
          const errorsProduct = errors.products ?? [];
          return (
            <>
              <Grid item xs={6} sm={6} md={6}>
                <SelectProduct
                  disabledDefault={disabled}
                  loading={loading}
                  index={index}
                  products={products}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <TextField
                  onChange={(e) => {
                    setValue(
                      `products.${index}.quantidity`,
                      parseInt(e.target.value, 10)
                    );
                  }}
                  value={watch(`products.${index}.quantidity`)}
                  error={!!errorsProduct[index]?.quantidity}
                  helperText={errorsProduct[index]?.quantidity?.message}
                  disabled={disabled}
                  id={`products.${index}.quantidity`}
                  fullWidth
                  type={"number"}
                  multiline
                  label="Quantidade"
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <TextField
                  onChange={(e) => {
                    setValue(
                      `products.${index}.value`,
                      parseInt(e.target.value, 10)
                    );
                  }}
                  value={watch(`products.${index}.value`)}
                  error={!!errorsProduct[index]?.value}
                  helperText={errorsProduct[index]?.value?.message}
                  disabled={disabled}
                  id={`products.${index}.value`}
                  fullWidth
                  type={"number"}
                  multiline
                  label="Valor"
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}
