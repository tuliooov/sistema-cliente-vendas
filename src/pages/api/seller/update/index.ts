import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaCrudSeller } from "@/app/sellers/components/ModalCrudSeller/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type IUpdateSeller = ISchemaCrudSeller;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const requestBody = (await parseBody(req)) as any;

    const { name, observation, id } = requestBody.fields as IUpdateSeller;

    if (!id) {
      return res.status(200).json({ error: `Representante não identificado.` });
    }

    if (!name || !observation) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedUser = await prismaClient.seller.update({
      where: {
        id: id,
      },
      data: {
        name,
        observation,
      },
    });

    res.json({ done: "ok", data: updatedUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
