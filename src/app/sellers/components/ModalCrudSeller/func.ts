import { ISellerComplete } from "@/pages/api/seller/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudSeller } from "./schema";

export const mapperSellerToForm = (
  seller: ISellerComplete,
  setValue: UseFormSetValue<ISchemaCrudSeller>
) => {
  setValue("seller", {
    id: seller.id,
    name: seller.name,
    email: seller.email,
    phone: seller.phone,
    cnpj: seller.cnpj,
    observation: seller.observation,
  });
  setValue("address", {
    id: seller.address.id,
    city: seller.address.city,
    country: seller.address.country,
    cep: seller.address.cep,
    district: seller.address.district,
    number: seller.address.number,
    state: seller.address.state,
    street: seller.address.street,
  });
};
