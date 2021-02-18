
const { User } = require('../models/user');
const { Form } = require('../models/form')


const login = async(req, res) => {

    // const {email, password} = req.body;

    // const user = await User.findOne({email})

    // if(usuario == null) {
    //     return res.status(400).json({
    //         message: 'Invalid email or password'
    //     })
    // }

    const users = await User.bulkCreate([
        { username: "us1", name: "name1", email: "user1@gmail.com", password: "12345"},
        { username: "us2", name: "name2", email: "user2@gmail.com", password: "12345"},
        { username: "us3", name: "name3", email: "user3@gmail.com", password: "12345"},
    ]).then((users) => {
        // The get() function allows you to recover only the DataValues of the object
        console.log(users.get());
        return users;
    })
    .catch((err) => {
        console.log("Error while users creation : ", err);
    });

    const forms = await Form.bulkCreate([
        { title: "title1", description: "asfsdfsdf"},
        { title: "title2", description: "asdasggsf"},
        { title: "title3", description: "asdafsdsdf"},
    ]).then((forms) => {
        // The get() function allows you to recover only the DataValues of the object
        console.log(forms.get());
        return forms;
    })
    .catch((err) => {
        console.log("Error while forms creation : ", err);
    });

    res.json({
        users,
        forms
    })

}


module.exports = {
    login
}