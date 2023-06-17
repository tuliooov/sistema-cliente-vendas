import { IProduct } from "./index";
import { NextApiHandler } from "next";
import prismaSeller from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export type IProductComplete = IProduct;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const { userbusiness } = req.headers as HeadersRequest

    if (!id) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do Produto.` });
    }

    const response = await prismaSeller.product.findFirst({
      where: {
        id: id as string,
        business: userbusiness
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
