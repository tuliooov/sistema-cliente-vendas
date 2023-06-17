import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { ISeller } from "../seller";
import { IClient } from "../clients";
import { IAddress } from "../address";
import { IProductOrder } from "../productOrder";
import { middleware } from "@/utils/helper/middleware";
import { ITypeUserEnum } from "../oauth/register";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";
import { IStatusEnum } from "@/utils/enums";

export const config = {
  api: {
    bodyParser: false,
  },
};


export interface IOrder {
  id?: string;
  code?: string;
  observation: string;
  status: IStatusEnum
  sellerId: string;
  seller: ISeller;
  clientId: string;
  client: IClient;
  deliveryAddress: IAddress;
  updatedAt?: string;
  createdAt?: string;
  total: number;
  productOrder: IProductOrder[];
}

export type IOrders = IOrder[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {

    const { usertype, useremail } = req.headers as HeadersRequest

    const argsFind: any = {
      include: {
        deliveryAddress: true,
        client: true,
        seller: true,
      },
    }

    if(usertype === ITypeUserEnum.SELLER){
      argsFind.where = {
        seller: {
          email: useremail
        }
      }
    }

    const response = await prismaOrder.order.findMany(argsFind);
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
