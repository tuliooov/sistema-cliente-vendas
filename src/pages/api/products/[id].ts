import { IProduct } from "./index";
import { NextApiHandler } from "next";
import prismaSeller from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export type IProductComplete = IProduct;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do Produto.` });
    }

    const response = await prismaSeller.product.findUnique({
      where: {
        id: id as string,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
