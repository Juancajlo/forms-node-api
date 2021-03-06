const { Router } = require("express");
const { check } = require("express-validator");

const {
  updateQuestion,
  createQuestion,
  getTotalAnswerByQuestionId,
  deleteQuestionById,
} = require("../controllers/questions");

const router = Router();

router.get(
  "/total-answers-by-question",
  [check("admin").equals("true")],
  getTotalAnswerByQuestionId
);
router.post("/:id", [check("admin").equals("true")], createQuestion);
router.put("/:id", [check("admin").equals("true")], updateQuestion);
router.delete("/:id", [check("admin").equals("true")], deleteQuestionById);

module.exports = router;
