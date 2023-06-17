import { NextApiHandler } from "next";
import prismaOrder from "@/lib/prisma";
import { IOrders } from "../orders";
import { IAddress } from "../address";
import { middleware } from "@/utils/helper/middleware";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const config = {
  api: {
    bodyParser: true,
  },
};

export interface ISeller {
  id?: string;
  name: string;
  observation: string;
  createdAt: string;
  phone: string;
  password: string;
  email: string;
  cnpj: string;
  orders: IOrders;
  address: IAddress;
}

export type ISellers = ISeller[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { userbusiness } = req.headers as HeadersRequest

    
    const response = await prismaOrder.seller.findMany({
      where:{
        business: userbusiness
      },
      include: {
        address: true,
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default middleware(handler);
