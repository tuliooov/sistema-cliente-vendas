import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaCrudSeller } from "@/app/sellers/components/ModalCrudSeller/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ICreateClient = ISchemaCrudSeller;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { name, observation } = requestBody.fields as ICreateClient;

    if (!name || !observation) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdUser = await prismaClient.seller.create({
      data: {
        name,
        observation,
      },
    });

    res.json({ done: "ok", data: createdUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
