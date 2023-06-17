import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface IBusiness {
  id: string;
  business: string;
  createdAt: string;
  updatedAt: string;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await prismaClient.business.findMany();
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
