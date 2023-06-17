import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

type IUpdateStatusOrder = {
  id: string
  status: string
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PATCH") {
    const requestBody = (await parseBody(req)) as any;

    const { id, status } =
      requestBody.fields as IUpdateStatusOrder;

    if (!id) {
      return res.status(200).json({ error: `Pedido não identificado.` });
    }

    if (!status) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedUser = await prismaClient.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    res.json({ done: "ok", data: updatedUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
