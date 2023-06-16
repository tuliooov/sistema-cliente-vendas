import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface IProduct {
  id: string;
  name: string;
}

export type IProductsOrder = IProduct[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
