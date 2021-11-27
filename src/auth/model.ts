import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs';

import { IUser } from '../types';

const UserSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  cpf:{
    type: Number,
    required: true,
  },
  picture:{
    type: String,
    required: true,
  },
},{
  timestamps: true,
});

UserSchema.pre<IUser>('save', async function (next) {
  const hashPass = await bcrypt.hash(this.password, 10)
  this.password = hashPass
  next()
})


export default mongoose.model<IUser>('User', UserSchema)