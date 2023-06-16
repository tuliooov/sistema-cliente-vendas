import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudClient } from "@/app/clients/components/ModalCrudClient/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type IUpdateClient = ISchemaCrudClient;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const requestBody = (await parseBody(req)) as any;

    const { address, customer } = requestBody.fields as IUpdateClient;

    const { id: idCustomer, ...restCustomer } = customer;
    const { id: idAddress, ...restAddress } = address;

    if (!idCustomer) {
      return res.status(200).json({ error: `Cliente não identificado.` });
    }

    if (!customer || !address) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedUser = await prismaClient.client.update({
      where: {
        id: idCustomer,
      },
      data: {
        ...restCustomer,
        address: {
          update: {
            ...restAddress,
          },
        },
      },
      include: {
        address: true,
      },
    });

    res.json({ done: "ok", data: updatedUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
