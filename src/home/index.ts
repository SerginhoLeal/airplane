import { Request, Response } from 'express';

import Home from './model';
import { sendEmail } from '../utils/nodemailer';

export class HomeController {
  
  async index (req:Request, res:Response){
    const { filter } = req.query;

    const docs = await Home.find().populate(["creator", "receiver"]);
    const filters = docs.filter(element => filter ? element?.title === filter : element);

    return res.json(filters);
  }

  async create (req:any, res:Response){
    const { 
      title,
      description,
      value,
     } = req.body;

    try{
      const create = await Home.create({
        title,
        description,
        creator: req.userId,
        receiver: null,
        value,
      });

      return res.json(create);
    }catch(err){
      return(err);
    }
  }

  async update (req:any, res:Response){
    const {
      title,
      description,
      value,
    } = req.body;

    const service_update = await Home.findById(req.params.id);

    if(String(service_update.creator) !== req.userId) return res.status(400).json({ is_not_you: true })

    try {
      await Home.findByIdAndUpdate(req.params.id, {
        title,
        description,
        value,
      }, {
        new: true
      });
      return res.json({ success: true })
    } catch (error) {
      
    }
  }

  async delete (req:any, res:Response){
    const service_update = await Home.findById(req.params.id);
    if(String(service_update.creator) !== req.userId) return res.status(400).json({ is_not_you: true })
    try {
      await Home.findByIdAndRemove(req.params.id)
      return res.json({success: true})
    } catch (error) {
      console.log(error);
    }
  }

  async email (req:Request, res:Response){
    const { id } = req.params;

    const service: any = await Home.findById(id);

    const link = `${process.env.API_URL}/api/accepting/${service.id}`;

    sendEmail(link, service, req.headers.authorization);

    return res.json(!!service);
  }

  async accepting (req:any, res:Response){
    const { id } = req.params;

    const service = await Home.findById(id);
    // const logged = await Home.findById(req.userId);

    try {
      await Home.findByIdAndUpdate(id, {
        receiver: req.userId
      }, {
        new: true
      })
      
      return res.json(!!service);
    
    } catch (error) {
      return error
    }
  }

};
