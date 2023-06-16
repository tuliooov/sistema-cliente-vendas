import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudClient } from "@/app/dashboard/clients/components/ModalCrudClient/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ICreateClient = ISchemaCrudClient;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { address, customer } = requestBody.fields as ICreateClient;

    if (!customer || !address) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdUser = await prismaClient.client.create({
      data: {
        ...customer,
        address: {
          create: {
            ...address,
          },
        },
      },
      include: {
        address: true,
      },
    });

    res.json({ done: "ok", data: createdUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
