import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudProduct } from "@/app/dashboard/products/components/ModalCrudProduct/schema";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

type ICreateProduct = ISchemaCrudProduct;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { name, stock } = requestBody.fields as ICreateProduct;
    const { userbusiness } = req.headers as HeadersRequest

    if (!name || !stock || !userbusiness) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdUser = await prismaClient.product.create({
      data: {
        name,
        stock,
        business: userbusiness
      },
    });

    res.json({ done: "ok", data: createdUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
