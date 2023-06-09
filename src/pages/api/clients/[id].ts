import { IClient } from "./index";
import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { IAddress } from "../address";

export const config = {
  api: {
    bodyParser: false,
  },
};

export type IClientComplete = IClient & {
  address: IAddress;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do cliente.` });
    }

    console.log(id);
    const response = await prismaClient.client.findUnique({
      where: {
        id: id as string,
      },
      include: {
        address: true,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
