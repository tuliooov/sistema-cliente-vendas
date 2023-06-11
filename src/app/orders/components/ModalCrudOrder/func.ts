import { IOrderComplete } from "@/pages/api/orders/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudOrder } from "./schema";

export const mapperOrderToForm = async (
  order: IOrderComplete,
  setValue: UseFormSetValue<ISchemaCrudOrder>
) => {
  console.log("order", order);
  setValue("order", {
    id: order.id,
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

  let products = [];
  for (let index = 0; index < order.productOrder.length; index++) {
    const product = order.productOrder[index];
    products.push({
      id: product.id,
      productId: product.productId,
      value: product.value,
      quantidity: product.quantidity,
    });
  }
  setValue("products", products);
};
