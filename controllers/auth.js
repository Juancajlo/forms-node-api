const models = require("../models");
const Menu = models.Menu;
const User = models.User;
const Form = models.Form;


const login = async(req, res) => {

    // const {email, password} = req.body;

    // const user = await User.findOne({email})

    // if(usuario == null) {
    //     return res.status(400).json({
    //         message: 'Invalid email or password'
    //     })
    // }


    const menus = await Menu.findAll({
        where: { id: 1 },
        include: {
        model: Menu,
        as: "subMenu",
        required: false,
        include: {
            all: true,
            nested: true,
        },
        },
    });


    // const menus = await Menu.create({
    //         title: "Menu"
    // })
    // .then((newMenu) => {
    //     // The get() function allows you to recover only the DataValues of the object
    //     console.log(newMenu.get());
    //     return newMenu;
    // })
    // .catch((err) => {
    //     console.log("Error while menu creation : ", err);
    // });


    // const users = await User.bulkCreate([
    //     { username: "us1", name: "name1", email: "user1@gmail.com", password: "12345"},
    //     { username: "us2", name: "name2", email: "user2@gmail.com", password: "12345"},
    //     { username: "us3", name: "name3", email: "user3@gmail.com", password: "12345"},
    // ]).then((users) => {
    //     // The get() function allows you to recover only the DataValues of the object
    //     console.log(users);
    //     return users;
    // })
    // .catch((err) => {
    //     console.log("Error while users creation : ", err);
    // });

    // const forms = await Form.bulkCreate([
    //     { title: "title1", description: "asfsdfsdf"},
    //     { title: "title2", description: "asdasggsf"},
    //     { title: "title3", description: "asdafsdsdf"},
    // ]).then((forms) => {
    //     // The get() function allows you to recover only the DataValues of the object
    //     console.log(forms);
    //     return forms;
    // })
    // .catch((err) => {
    //     console.log("Error while forms creation : ", err);
    // });

    res.json({
        menus
    })

}


module.exports = {
    login
}