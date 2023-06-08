import { IOrderComplete } from "@/pages/api/orders/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudOrder } from "./schema";

export const mapperOrderToForm = (
  seller: IOrderComplete,
  setValue: UseFormSetValue<ISchemaCrudOrder>
) => {
  setValue("observation", seller.observation);
};
