import { IOrderComplete } from "@/pages/api/orders/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudOrder } from "./schema";

export const mapperOrderToForm = async (
  order: IOrderComplete,
  setValue: UseFormSetValue<ISchemaCrudOrder>
) => {
  console.log("order", order);
  setValue("order", {
    observation: order.observation,
    clientId: order.client.id ?? "",
    sellerId: order.seller.id ?? "",
  });
  setValue("deliveryAddress", {
    id: order.deliveryAddress.id,
    city: order.deliveryAddress.city,
    country: order.deliveryAddress.country,
    district: order.deliveryAddress.district,
    number: order.deliveryAddress.number,
    state: order.deliveryAddress.state,
    street: order.deliveryAddress.street,
  });
};
