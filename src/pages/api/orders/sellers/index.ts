import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ITypeUserEnum } from "../../oauth/register";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface ISeller {
  id: string;
  name: string;
}

export type ISellersOrders = ISeller[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {

    const { usertype, useremail, userbusiness } = req.headers  as HeadersRequest

    const findArgs: any = {
      where: {
        business: userbusiness
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    }

    console.log(usertype)
    if(usertype === ITypeUserEnum.SELLER){
      findArgs.where = {
        email: useremail,
        business: userbusiness
      }
    }
    
    const response = await prismaOrder.seller.findMany(findArgs);

    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
