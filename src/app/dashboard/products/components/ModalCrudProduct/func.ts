import { IProductComplete } from "@/pages/api/products/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudProduct } from "./schema";

export const mapperProductToForm = (
  product: IProductComplete,
  setValue: UseFormSetValue<ISchemaCrudProduct>
) => {
  setValue("id", product.id);
  setValue("name", product.name);
  setValue("stock", product.stock);
};
