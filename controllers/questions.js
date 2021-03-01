const models = require("../models");

const Question = models.Question;

const getTotalAnswerByQuestionId = async (req, res) => {
  const id = req.params.id;

  await Question.findOne({
    where: { id },
    include: {
      model: Answer,
      as: "answers",
      required: false,
      // include: {
      //   all: true,
      //   nested: true,
      // },
    },
  })
    .then((question) => {
      if (question == null) {
        return res.status(400).json({
          msg: "No question found",
        });
      }

      const totalAnswers = question.answers.length();

      res.json({
        totalAnswers,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: `Internal server error getting form with id ${id}`,
        },
      });
    });
};

const deleteQuestionById = async (req, res) => {
  const id = req.params.id;

  const question = await Question.findOne({
    where: { id },
  })
    .then((question) => {
      if (question == null) {
        return res.status(400).json({
          msg: "Question not found",
        });
      }

      return question;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: `Internal server error getting question with id ${id}`,
        },
      });
    });

  await question
    .destroy()
    .then(() => {
      res.json({
        message: `Question with id ${id} deleted successfully`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: `Internal server error deleting question with id ${id}`,
        },
      });
    });
};

const updateQuestion = async (req, res) => {
  const id = req.params.id;

  const { title, input_type, input_options } = req.body;

  const questionFound = await Question.findByPk(id)
    .then((question) => {
      if (question == null) {
        return res.status(400).json({
          msg: "Question not found",
        });
      }

      return question;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error updating a question",
        },
      });
    });

  if (title !== undefined) {
    questionFound.title = title;
  }

  if (input_type !== undefined) {
    questionFound.input_type = input_type;
  }

  if (input_options !== undefined) {
    questionFound.input_options = input_options;
  }

  const questionSaved = await questionFound.save();

  res.json({
    questionSaved,
  });
};

const createQuestion = async (req, res) => {
  const { title, formId, input_type, input_options } = req.body;

  await Question.create({
    title,
    formId,
    input_type,
    input_options,
  })
    .then((question) => {
      res.json({
        question,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error creating a question",
        },
      });
    });
};

module.exports = {
  createQuestion,
  updateQuestion,
  getTotalAnswerByQuestionId,
  deleteQuestionById,
};
