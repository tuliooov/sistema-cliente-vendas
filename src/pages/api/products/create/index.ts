import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaCrudProduct } from "@/app/products/components/ModalCrudProduct/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ICreateProduct = ISchemaCrudProduct;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { name, stock } = requestBody.fields as ICreateProduct;

    if (!name || !stock) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdUser = await prismaClient.product.create({
      data: {
        name,
        stock,
      },
    });

    res.json({ done: "ok", data: createdUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
