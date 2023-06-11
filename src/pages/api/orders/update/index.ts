import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaCrudOrder } from "@/app/orders/components/ModalCrudOrder/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type IUpdateOrder = ISchemaCrudOrder;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const requestBody = (await parseBody(req)) as any;

    const { deliveryAddress, order, products } =
      requestBody.fields as IUpdateOrder;

    const { id: idOrder, ...restOrder } = order;
    const { id: idDeliveryAddress, ...restDeliveryAddress } = deliveryAddress;

    if (!idOrder) {
      return res.status(200).json({ error: `Pedido não identificado.` });
    }

    if (!restOrder || !restDeliveryAddress || !products.length) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const updatedUser = await prismaClient.order.update({
      where: {
        id: idOrder,
      },
      data: {
        ...restOrder,
        deliveryAddress: {
          update: {
            ...restDeliveryAddress,
          },
        },
        productOrder: {
          create: products,
        },
      },
      include: {
        deliveryAddress: true,
        client: true,
        seller: true,
        productOrder: true,
      },
    });

    res.json({ done: "ok", data: updatedUser });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
