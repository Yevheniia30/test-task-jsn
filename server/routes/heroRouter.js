const Router = require("express");
const router = new Router();
const heroController = require("../controllers/heroController");

// console.log("heroController", heroController);

// router.get('/', (req, res)=>{
//     res.status(200).json({message: 'woooork'})
// })
router.get("/", heroController.get);
router.post("/create", heroController.create);
router.get("/:id", heroController.getOne);
router.delete("/:id", heroController.delete);
// router.patch("/update", heroController.update);

module.exports = router;