const {Hero} = require('../models/models')
const ApiError=require('../error/ApiError')
const multer=require('multer')
const path=require('path')
const uuid = require("uuid");
const upload = multer({ dest: 'uploads/' })


// const nanoid=require("nanoid")
// import { nanoid } from 'nanoid'

class HeroController{
    async get(req, res, next){
        console.log('req query', req.query);
        let {page, limit}=req.query
        page=page||1
        limit=limit||10
        let offset=page*limit-limit
        const heroes=await Hero.findAndCountAll({ limit, offset})
        return res.json(heroes)
    }

    async getOne(req, res){
        console.log('req params', req.params);
        const {id}=req.params
        const hero=await Hero.findOne({where: {id}})
        return res.json(hero)
    }

    async create(req, res){
        console.log('req.body', req.body);
        console.log('req.files', req.files.images);
        const {nickname, real_name}=req.body
        const {images}=req.files
        let filename=uuid.v4()+'.jpg'
        images.mv(path.resolve(__dirname, '..', 'uploads', filename))

        const hero=await Hero.create({nickname, real_name, images: filename})
        return res.json(hero)
    }

    async delete(req, res){
        console.log('req params', req.params);
        const {id}=req.params
        const hero=await Hero.destroy({where: {id}})
        return res.json(hero)
    }

    async update(req, res){}
}

module.exports=new HeroController()