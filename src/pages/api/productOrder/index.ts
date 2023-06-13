import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { IOrder } from "../orders";
import { IProductComplete } from "../products/[id]";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface IProductOrder {
  id: string;
  productId: string;
  quantidity: number;
  value: number;
  order: IOrder;
  orderId: string;
  createdAt: string;
  product?: IProductComplete
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaClient.productOrder.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
