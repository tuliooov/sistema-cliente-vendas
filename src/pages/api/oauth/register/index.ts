import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { jwtSystem } from "@/utils/jwt";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface IDataRequest {
  email: string;
  name: string;
  password: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  accessToken: unknown;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { email, password: pass, name } = requestBody.fields as IDataRequest;

    if (!email || !pass || !name) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const userFound = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (userFound) {
      res.status(400).json({ error: `Usuãrio ${email} ja existe` });
    } else {
      const passwordCript = bcrypt.hashSync(pass, 8);
      let userCreated = await prismaClient.user.create({
        data: {
          email,
          password: passwordCript,
          name,
        },
      });

      const {password, ...rest} = userCreated

      const accessToken = await jwtSystem.signAccessToken(rest);
      res.json({ done: "ok", data: accessToken });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
