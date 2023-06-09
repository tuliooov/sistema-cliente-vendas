import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudProduct } from "@/app/dashboard/products/components/ModalCrudProduct/schema";

export const config = {
  api: {
    bodyParser: true,
  },
};

type IUpdateProduct = ISchemaCrudProduct;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const requestBody = (await parseBody(req)) as any;

    const { name, stock, id } = requestBody.fields as IUpdateProduct;

    if (!id) {
      return res.status(200).json({ error: `Produto não identificado.` });
    }

    if (!name || !stock) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedProduct = await prismaClient.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        stock,
      },
    });

    res.json({ done: "ok", data: updatedProduct });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
