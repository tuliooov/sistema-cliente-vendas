import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { IOrders } from "../orders";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface IProduct {
  id?: string;
  createdAt: string;
  name: string;
  stock: number;
}

export type IProducts = IProduct[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaOrder.product.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
