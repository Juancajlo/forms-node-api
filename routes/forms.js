const { Router } = require("express");

const { getFormById, createForm, updateForm } = require("../controllers/forms");

const router = Router();

router.get("/:id", getFormById);
router.post("/", [check("admin").equals("true")], createForm);
router.put("/:id", [check("admin").equals("true")], updateForm);

module.exports = router;
