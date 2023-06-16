import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: false,
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
    const response = await prismaClient.client.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

  export default middleware(handler);
