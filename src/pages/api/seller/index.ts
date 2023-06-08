import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { IOrders } from "../orders";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface ISeller {
  id?: string;
  name: string;
  observation: string;
  createdAt: string;
  orders: IOrders;
}

export type ISellers = ISeller[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaOrder.seller.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
