const { Hero } = require("../models/models");
const ApiError = require("../error/ApiError");

const path = require("path");
const uuid = require("uuid");

const multer = require("multer");

// const nanoid=require("nanoid")
// import { nanoid } from 'nanoid'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // limits: {
  //   fileSize: 1048576,
  // },
});

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
      console.log("HERO", hero);
      if (hero) {
        return res.json(hero);
      } else {
        throw new Error(ApiError.badRequest(error.message));
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
      let info={
        ...req.body,
        Images: req.files
      }
      const hero=await Hero.create(info)
      // const { images } = req.files;
      // let filename = uuid.v4() + ".jpg";
      // images.mv(path.resolve(__dirname, "..", "uploads", filename));

      // const hero = await Hero.create({ ...req.body, images: filename });
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

      let info={
        ...req.body,
        Images: req.files.map(item=>(
          JSON.stringify(item)
        ))
      }
      console.log('INFO', info);
     await Hero.update(info, {
        where: {
          id,
        },
      });
    //   const { id } = req.body;
    //   let fileName = "";
    //   if (req.files) {
    //     const { images } = req.files;
    //     fileName = uuid.v4() + ".jpg";
    //     images.mv(path.resolve(__dirname, "..", "uploads", fileName));
    //   }

    //   const config = {
    //     ...req.body,
    //   };
    //   if (fileName) {
    //     config.images = fileName;
    //   }

    //  await Hero.update(config, {
    //     where: {
    //       id,
    //     },
    //   });
    //   console.log("CONFIG", config);

      
      // console.log("HERO", hero, "RES body", res);
      //   return req.body
      // return res.json(hero)
      // return res.json({ id, ...config });
      // console.log('RES BODY', res.json(res.body));
      return res.json({id, ...info});
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

// upload images

//  storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   // limits: {
//   //   fileSize: 1048576,
//   // },
// });

 upload =  multer({
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("give proper file format to upload");
  },
}).array("Images", 3);

}



module.exports = new HeroController();
