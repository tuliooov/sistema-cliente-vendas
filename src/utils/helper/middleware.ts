import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { jwtSystem } from "../jwt";
import { HeadersRequest } from "@/app/dashboard/sellers/components/ModalCrudSeller/FormCrudSeller";

export const middleware = (handler: NextApiHandler<any>) => async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await validationAccess(req, res)
  const { userbusiness } = req.headers  as HeadersRequest

  const oauthApi = req.url?.includes('api/oauth')

  if (!oauthApi && !userbusiness ) {
    return res
      .status(200)
      .json({ error: `Não identificamos a empresa.` });
  }
  
  return handler(req, res)
}

const validationAccess = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.headers.authorization) {
    res.status(403).json({ error: `Token expirado` });
  }
  const accessTokenExpired = await isAccessTokenExpired(req.headers.authorization)
  if(accessTokenExpired.error){
    res.status(403).json({ error: `Token expirado` });
  }
}

export const isAccessTokenExpired = async (token?: string) => {
 return await jwtSystem.verifyAccessToken(token).then(user => {
    return {user, error: false}
  }).catch (e => {
    return {user: {}, error: true}
  })
}