import { NextApiHandler } from "next";
import { parseBody } from "@/utils/parseBody";
import prismaClient from "@/lib/prisma";
import { ISchemaRegisterBusiness } from "@/app/register/schema";
import { ITypeUserEnum } from "../../register";
import bcrypt from "bcryptjs";
import { jwtSystem } from "@/utils/jwt";
import { getPermissions } from "@/utils/allowed";

export const config = {
  api: {
    bodyParser: true,
  },
};
type ICreateBusiness = ISchemaRegisterBusiness;


const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const requestBody = (await parseBody(req)) as any;

    const { business, email, password, userName, urlLogo } = requestBody.fields as ICreateBusiness;

    if (!business || !email || !password || !userName || !urlLogo) {
      return res.status(200).json({ error: `Formulário incompleto.` });
    }

    const passwordCript = bcrypt.hashSync(password, 8);

    const businessCreated = await prismaClient.business.create({
      data: {
        urlLogo,
        business,
        user: {
          create: {
            business,
            email,
            password: passwordCript,
            type: ITypeUserEnum.ADMIN,
            name: userName,
          }
        }
      },
      include: {
        user: true
      }
    });

    const { ...restUser } = businessCreated.user;

    const accessToken = await jwtSystem.signAccessToken(restUser);

    const permissions = getPermissions(restUser.type)

    return res.json({ done: "ok", data: { ...restUser, accessToken, permissions } });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

export default handler;
