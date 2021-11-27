import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const authConfig = process.env.GERANDO_TOKEN_LISTENER

export default (req: any, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(511).send({ not_provided: true })

  const parts = authHeader.split(' ')

  if (parts.length !== 2) return res.status(511).send({ token_error: true })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(511).send({ error: 'Token malformatted' })

  jwt.verify(token, authConfig, (err: object, decoded: any) => {
    if (err) return res.status(511).send({ inspired_session: true })

    req.userId = decoded.id

    return next()
  })
}