import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface ISeller {
  id: string;
  name: string;
}

export type ISellersOrders = ISeller[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaOrder.seller.findMany({
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

export default handler;
