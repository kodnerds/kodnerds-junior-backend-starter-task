import type { Request, Response } from "express";
import * as dataService from "../services/dataService.js";

export const allData = async(req:Request,res:Response)=>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const allData = await dataService.getAllData(page,limit);
    res.status(allData.code).json(allData);
}

export const singleData = async(req:Request,res:Response) =>{
    const id = Number(req.params.id);
    const response = await dataService.getDataById(id)
    if(!response) return res.status(404).json({message:"Data was not found"});
    res.json(response)
}

export const createData  = async(req:Request,res:Response) =>{
    const {title,author,date,description,image,views,comment,likes,readMore} = req.body
    const newResponse = await dataService.addData({author,title,date,description,image,comment,likes,views,readMore})
    res.status(newResponse.code).json(newResponse);
}

export const editData = async(req:Request,res:Response) =>{
    const id = Number(req.params.id);
    const updated = await dataService.updateData(id,req.body);
    if(!updated) return res.status(404).json({message:'Data not found'})
        res.status(updated.code).json(updated);
};

export const deleteData = async(req:Request,res:Response) =>{
    const id = Number(req.params.id);
    const deletedResponse = await dataService.deleteData(id);
    if(!deletedResponse) return res.status(404).json({message:"Data not found"});
    res.status(deletedResponse.code).json(deletedResponse);
}