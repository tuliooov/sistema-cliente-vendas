import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudSeller } from "@/app/dashboard/sellers/components/ModalCrudSeller/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ICreateSeller = ISchemaCrudSeller;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { seller, address } = requestBody.fields as ICreateSeller;

    if (!seller || !address) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdUser = await prismaClient.seller.create({
      data: {
        ...seller,
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
