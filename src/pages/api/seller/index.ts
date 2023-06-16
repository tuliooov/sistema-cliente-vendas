import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { IOrders } from "../orders";
import { IAddress } from "../address";
import { middleware } from "@/utils/helper/middleware";

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
  phone: string;
  email: string;
  cnpj: string;
  orders: IOrders;
  address: IAddress;
}

export type ISellers = ISeller[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaOrder.seller.findMany({
      include: {
        address: true,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
