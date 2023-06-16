import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface IAddress {
  id?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  cep: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaClient.address.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
