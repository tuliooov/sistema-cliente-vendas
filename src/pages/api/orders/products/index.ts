import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface IProduct {
  id: string;
  name: string;
}

export type IProductsOrder = IProduct[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { userbusiness } = req.headers  as HeadersRequest
    const response = await prismaClient.product.findMany({
      where: {
        business: userbusiness
      },
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
