const models = require("../models");
const Menu = models.Menu;

const createMenu = async (req, res) => {
  const { title, subMenuId, formId } = req.body;

  await Menu.create({
    title,
    subMenuId,
    formId,
  })
    .then((menu) => {
      res.json({
        menu,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error creating a menu",
        },
      });
    });
};

const getMenus = async (req, res) => {
  await Menu.findAll({
    where: { subMenuId: null },
    include: {
      model: Menu,
      as: "subMenu",
      required: false,
      include: {
        all: true,
        nested: true,
      },
    },
  })
    .then((menus) => {
      res.json({
        menus,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error getting menus",
        },
      });
    });
};

const deleteMenuById = async (req, res) => {
  const id = req.params.id;

  const menu = await Menu.findOne({
    where: { id },
  })
    .then((menu) => {
      if (menu == null) {
        return res.status(400).json({
          msg: "Menu not found",
        });
      }

      return menu;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: `Internal server error getting menu with id ${id}`,
        },
      });
    });

  await menu
    .destroy()
    .then(() => {
      res.json({
        message: `Menu with id ${id} deleted successfully`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: `Internal server error deleting menu with id ${id}`,
        },
      });
    });
};

const updateMenu = (req, res) => {
  const id = req.params.id;

  const { title, subMenuId, formId } = req.body;

  const menuFound = await Menu.findByPk(id)
    .then((menu) => {
      if (menu == null) {
        return res.status(400).json({
          msg: "Menu not found",
        });
      }

      return menu;
    })
    .catch((error) => {
      res.status(500).json({
        error: {
          error,
          message: "Internal server error updating a menu",
        },
      });
    });

  if (title !== undefined) {
    menuFound.title = title;
  }

  if (subMenuId !== undefined) {
    menuFound.subMenuId = subMenuId;
  }

  if (formId !== undefined) {
    menuFound.formId = formId;
  }

  const menuSaved = await menuFound.save();

  res.json({
    menuSaved,
  });
};

module.exports = {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenuById
};
