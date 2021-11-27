import { Request, Response } from 'express';
import User from './model';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authConfig = process.env.GERANDO_TOKEN_LISTENER

function generateToken (params = {}) {
  return jwt.sign(params, authConfig, {
    expiresIn: 86400
  })
}

export class UserController {
  async login (req:Request, res:Response){
    const { name, password } = req.body
    try {
      const Auth = await User.findOne({ name }).select('+password')

      if (!Auth) return res.status(400).send({ error: 'falha na autenticação' })

      if (!await bcrypt.compare(password, Auth.password)) return res.status(400).send({ error: 'falha na autenticação' })

      Auth.password = undefined

      return res.send({ Auth, token: generateToken({ id: Auth.id }) })
    } catch (e) {
      return res.status(400).send({ error: e })
    }
  }

  async create (req:Request, res:Response){
    const { 
      name,
      email,
      password,
      confPass,
      cpf,
      picture
     } = req.body;

    if (password !== confPass) return res.status(400).json({ password_fail: true })

    try {
      const create = await User.create({
        name,
        email,
        password,
        cpf,
        picture
      }).then(() => generateToken({ id: create.id }))

      if (create) 
        return res.status(200).json({ success: true })

    } catch (err) {
      if (err.keyValue.email) return res.json({ email_in_use: true })
    }
  }
};
