const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

class Server {
  apiPaths = {
    users: "/api/users",
    forms: "/api/forms",
    menus: "/api/menus",
    auth: "/api/auth",
    questions: "/api/questions",
    answers: "/api/answers",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.auth, require("./routes/auth"));
    this.app.use(this.apiPaths.users, require("./routes/users"));
    this.app.use(this.apiPaths.menus, require("./routes/menus"));
    this.app.use(this.apiPaths.forms, require("./routes/forms"));
    this.app.use(this.apiPaths.questions, require("./routes/questions"));
    this.app.use(this.apiPaths.answers, require("./routes/answers"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
