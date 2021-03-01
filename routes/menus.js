const { Router } = require("express");
const { check } = require("express-validator");

const {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenuById,
} = require("../controllers/menus");

const router = Router();

router.get("/", getMenus);
router.post("/", [check("admin").equals("true")], createMenu);
router.put("/:id", [check("admin").equals("true")], updateMenu);
router.delete("/:id", [check("admin").equals("true")], deleteMenuById);

module.exports = router;
