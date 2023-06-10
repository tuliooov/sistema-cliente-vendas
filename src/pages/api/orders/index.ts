import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { ISeller } from "../seller";
import { IClient } from "../clients";
import { IAddress } from "../address";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface IOrder {
  id?: string;
  observation: string;
  sellerId: string;
  seller: ISeller;
  clientId: string;
  client: IClient;
  deliveryAddress: IAddress;
  createdAt: string;
}

export type IOrders = IOrder[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaOrder.order.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
