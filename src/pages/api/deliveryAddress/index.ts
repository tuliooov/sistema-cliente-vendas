import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface IDeliveryAddress {
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
    const response = await prismaClient.deliveryAddress.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
