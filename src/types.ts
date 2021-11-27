import { Document, ObjectId } from 'mongoose'

export interface IHome extends Document {
  valor?:string,
  image?:string,
  title?:string,
  creator?: ObjectId,
  receptor?: ObjectId,
  description?:string,
  filter?: any,
}

export interface IUser extends Document {
  cpf?:string,
  name?:string,
  email?:string,
  picture?:string,
  password?:string,
}