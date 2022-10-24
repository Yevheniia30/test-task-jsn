const { Hero } = require("../models/models");
const ApiError = require("../error/ApiError");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const upload = multer({ dest: "uploads/" });

// const nanoid=require("nanoid")
// import { nanoid } from 'nanoid'

class HeroController {
  async get(req, res, next) {
    console.log("req query", req.query);
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    const heroes = await Hero.findAndCountAll({ limit, offset });
    return res.json(heroes);
  }

  async getOne(req, res, next) {
    console.log("req params", req.params);
    try {
      const { id } = req.params;
      const hero = await Hero.findOne({ where: { id } });
      console.log('HERO', hero)
      if(hero){
        return res.json(hero);
 
      } else {
        throw new Error(ApiError.badRequest(error.message))
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async create(req, res, next) {
    console.log("req.body", req.body);
    console.log("req.files", req.files);
    // const { nickname, real_name } = req.body;
    try {
      const { images } = req.files;
      let filename = uuid.v4() + ".jpg";
      images.mv(path.resolve(__dirname, "..", "uploads", filename));
  
      const hero = await Hero.create({ ...req.body, images: filename });
      return res.json(hero);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
   
  }

  async delete(req, res) {
    console.log("req params", req.params);
    const { id } = req.params;
    const hero = await Hero.destroy({ where: { id } });
    return res.json(hero);
  }

  async update(req, res, next) {
    console.log("BODY", req.body, "FILES", req.files);
    try {
      const { id } = req.body;
      let fileName = "";
      if (req.files) {
        const { images } = req.files;
        fileName = uuid.v4() + ".jpg";
        images.mv(path.resolve(__dirname, "..", "uploads", fileName));
      }

      const config = {
        ...req.body,
      };
      if (fileName) {
        config.images = fileName;
      }

      const hero = await Hero.update(config, {
        where: {
          id,
        },
      });
      console.log("CONFIG", config);
      // console.log("HERO", hero, "RES body", res);
      //   return req.body
      // return res.json(hero)
      return res.json({ id, ...config });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new HeroController();
