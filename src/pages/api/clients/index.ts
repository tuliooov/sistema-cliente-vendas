import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface IClient {
  id?: string;
  name: string;
  nameFantasy: string;
  phone: string;
  email: string;
  cnpj: string;
  responsible: string;
  stateRegistration: string;
  observation: string;
  createdAt: string;
}

export type IClients = IClient[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { userbusiness } = req.headers  as HeadersRequest
    const response = await prismaClient.client.findMany({
      where: {
        business: userbusiness
      }
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

  export default middleware(handler);
