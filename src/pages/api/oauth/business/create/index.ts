import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { business } = requestBody.fields;

    if (!business) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const businessCreated = await prismaClient.business.create({
      data: {
        business
      },
    });

    res.json({ done: "ok", data: businessCreated });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
