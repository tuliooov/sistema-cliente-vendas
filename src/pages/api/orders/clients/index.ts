import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface IClient {
  id: string;
  nameFantasy: string;
}

export type IClientsOrders = IClient[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaClient.client.findMany({
      select: {
        id: true,
        nameFantasy: true,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
