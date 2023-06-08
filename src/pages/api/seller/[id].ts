import { ISeller } from "./index";
import { NextApiHandler } from "next";
import prismaSeller from "@/lib/prisma";
import { IAddress } from "../address";

export const config = {
  api: {
    bodyParser: false,
  },
};

export type ISellerComplete = ISeller;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do Seller.` });
    }

    const response = await prismaSeller.seller.findUnique({
      where: {
        id: id as string,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
