import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaCrudOrder } from "@/app/orders/components/ModalCrudOrder/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ICreateOrder = ISchemaCrudOrder;

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { deliveryAddress, order, products } =
      requestBody.fields as ICreateOrder;

    console.log(requestBody.fields);

    if (!deliveryAddress || !order || !products.length) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const createdOrder = await prismaClient.order.create({
      data: {
        ...order,
        deliveryAddress: {
          create: {
            ...deliveryAddress,
          },
        },
        productOrder: {
          create: products,
        },
      },
      include: {
        deliveryAddress: true,
        productOrder: true,
      },
    });

    res.json({ done: "ok", data: createdOrder });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
