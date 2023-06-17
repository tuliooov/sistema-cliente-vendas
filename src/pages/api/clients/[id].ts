import { IClient } from "./index";
import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { IAddress } from "../address";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export type IClientComplete = IClient & {
  address: IAddress;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { userbusiness } = req.headers  as HeadersRequest

    if (!id || !userbusiness) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do cliente.` });
    }

    console.log(id);
    const response = await prismaClient.client.findFirst({
      where: {
        id: id as string,
        business: userbusiness
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

export default middleware(handler);
