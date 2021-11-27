import mongoose, {Schema, Document} from 'mongoose'
import { IHome } from '../types';

const HomeSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  value:{
    type: String,
    required: true,
  },
},{
  timestamps: true,
});


export default mongoose.model<IHome | any>('Home', HomeSchema)