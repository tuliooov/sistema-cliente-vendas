import { IOrder } from "./index";
import { NextApiHandler } from "next";
import prismaClient from "@/lib/prisma";
import { IDeliveryAddress } from "../deliveryAddress";

export const config = {
  api: {
    bodyParser: false,
  },
};

export type IOrderComplete = IOrder;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(200)
        .json({ error: `Não identificamos o ID do pedido.` });
    }

    const response = await prismaClient.order.findUnique({
      where: {
        id: id as string,
      },
      include: {
        deliveryAddress: true,
        client: true,
        seller: {
          include: {
            address: true,
          }
        },
        productOrder: {
          include: {
            product: true
          }
        },
      },
    });
    res.json({ done: "ok", data: response });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
