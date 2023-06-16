import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaCrudOrder } from "@/app/dashboard/orders/components/ModalCrudOrder/schema";

function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  while (code.length < 5) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    if (code.indexOf(randomChar) === -1) {
      code += randomChar;
    }
  }
  return code.toUpperCase();
}

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
        code: generateUniqueCode(),
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

export default middleware(handler);
