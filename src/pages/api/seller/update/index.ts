import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
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

    const { address, seller } = requestBody.fields as IUpdateSeller;

    const { id: idSeller, ...restSeller } = seller;
    const { id: idAddress, ...restAddress } = address;

    if (!idSeller) {
      return res.status(200).json({ error: `Representante não identificado.` });
    }

    if (!seller || !address) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedUser = await prismaClient.seller.update({
      where: {
        id: idSeller,
      },
      data: {
        ...restSeller,
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
