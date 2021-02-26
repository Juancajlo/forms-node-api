const models = require("../models");

const Answer = models.Answer;

const updateAnswer = async (req, res) => {
  const id = req.params.id;

  const { input } = req.body;

  const answerFound = await Answer.findByPk(id)
    .then((answer) => {
      if (answer == null) {
        return res.status(400).json({
          msg: "Answer not found",
        });
      }

      return answer;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error updating an answer",
        },
      });
    });

  if (input !== undefined) {
    answerFound.input = input;
  }

  const answerSaved = await answerFound.save();

  res.json({
    answerSaved,
  });
};

const createAnswer = async (req, res) => {
  const { input, questionId, userId } = req.body;

  await Answer.create({
    input,
    userId,
    questionId,
  })
    .then((answer) => {
      res.json({
        answer,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error creating an answer",
        },
      });
    });
};

module.exports = {
  createAnswer,
  updateAnswer,
};
