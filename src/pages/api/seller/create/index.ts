import { ITypeUserEnum, findUser } from './../../oauth/register/index';
import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudSeller } from "@/app/dashboard/sellers/components/ModalCrudSeller/schema";
import { createUser } from "../../oauth/register";
import { HeadersRequest } from '@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller';

export const config = {
  api: {
    bodyParser: true,
  },
};

type ICreateSeller = ISchemaCrudSeller;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { seller, address } = requestBody.fields as ICreateSeller;
    const { userbusiness } = req.headers as HeadersRequest

    if (!seller || !address || !userbusiness || !seller.password) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const {password, ...restSeller} = seller

    await findUser(restSeller.email, userbusiness, res)
    
    const createdUser = await prismaClient.seller.create({
      data: {
        ...restSeller,
        business: userbusiness,
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


    await createUser(password, restSeller.name, restSeller.email, ITypeUserEnum.SELLER, userbusiness, res);

    res.json({ done: "ok", data: createdUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
