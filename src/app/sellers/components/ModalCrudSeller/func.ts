import { ISellerComplete } from "@/pages/api/seller/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudSeller } from "./schema";

export const mapperSellerToForm = (
  seller: ISellerComplete,
  setValue: UseFormSetValue<ISchemaCrudSeller>
) => {
  setValue("name", seller.name);
  setValue("observation", seller.observation);
};
