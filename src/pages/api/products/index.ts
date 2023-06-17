import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { IOrders } from "../orders";
import { middleware } from "@/utils/helper/middleware";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

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

    const { userbusiness } = req.headers as HeadersRequest

    const response = await prismaOrder.product.findMany({
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
