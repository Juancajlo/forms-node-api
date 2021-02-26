const models = require("../models");
const Form = models.Form;
const Question = models.Question;

const updateForm = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  const formFound = await Form.findByPk(id)
    .then((form) => {
      if (form == null) {
        return res.status(400).json({
          msg: "Form not found",
        });
      }

      return form;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error updating a form",
        },
      });
    });

  if (title !== undefined) {
    formFound.title = title;
  }

  if (description !== undefined) {
    formFound.description = description;
  }

  const formSaved = await formFound.save();

  res.json({
    formSaved,
  });
};

const createForm = async (req, res) => {
  const { title, description } = req.body;

  await Form.create({
    title,
    description,
  })
    .then((form) => {
      res.json({
        form,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error creating a form",
        },
      });
    });
};

const getFormById = async (req, res) => {
  const id = req.params.id;

  await Form.findOne({
    where: { id },
    include: {
      model: Question,
      as: "questions",
      required: false,
      // include: {
      //   all: true,
      //   nested: true,
      // },
    },
  })
    .then((form) => {
      if (form == null) {
        return res.status(400).json({
          msg: "No form found",
        });
      }

      res.json({
        form,
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

module.exports = {
  getFormById,
  createForm,
  updateForm,
};
