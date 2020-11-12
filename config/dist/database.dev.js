"use strict";

module.exports = {
  mongoDbUrl: "mongodb+srv://".concat(process.env.DATABASE_USERNAME, ":").concat(process.env.DATABASE_PASSWORD, "@cluster0.e6jji.mongodb.net/maven-cms?retryWrites=true&w=majority")
};