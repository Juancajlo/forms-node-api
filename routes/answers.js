const { Router } = require("express");

const { createAnswer, updateAnswer } = require("../controllers/answers");

const router = Router();

router.post("/:id", createAnswer);
router.put("/:id", updateAnswer);

module.exports = router;
