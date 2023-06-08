import { IClientComplete } from "@/pages/api/clients/[id]";
import { UseFormSetValue } from "react-hook-form";
import { ISchemaCrudClient } from "./schema";

export const mapperClientToForm = (
  client: IClientComplete,
  setValue: UseFormSetValue<ISchemaCrudClient>
) => {
  setValue("customer", {
    id: client.id,
    name: client.name,
    cnpj: client.cnpj,
    email: client.email,
    nameFantasy: client.nameFantasy,
    observation: client.observation,
    phone: client.phone,
    responsible: client.responsible,
    stateRegistration: client.stateRegistration,
  });
  setValue("address", {
    id: client.address.id,
    city: client.address.city,
    country: client.address.country,
    district: client.address.district,
    number: client.address.number,
    state: client.address.state,
    street: client.address.street,
  });
};
