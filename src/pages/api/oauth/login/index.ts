import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { middleware } from "@/utils/helper/middleware";
import { ISchemaLogin } from "@/app/schema";
import bcrypt from "bcryptjs";
import { jwtSystem } from "@/utils/jwt";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface IDataRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  createdAt: string
  updatedAt: string
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { email, password: pass } = requestBody.fields as IDataRequest;

    if (!email || !pass) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const userFound = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound) {
      res.status(400).json({ error: `Usuário ${email} não encontrado` });
    } else {

      const checkPassword = bcrypt.compareSync(pass, userFound.password)
      
      if (!checkPassword) {
        res.status(400).json({ error: 'Senha incorreta' });
      }
      
      const {password, ...rest} = userFound
      const accessToken = await jwtSystem.signAccessToken(rest)
      res.json({ done: "ok", data: { ...rest, accessToken } });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
