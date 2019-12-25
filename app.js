const express = require("express");
const useMiddleware = require("./middleware");
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
const indexRouter = require("./routers/index");
const singUpRouter = require("./routers/registration");
const loginRouter = require("./routers/login");
const postRouter = require("./routers/post");

app.use("/", indexRouter);
app.use("/registration", singUpRouter);
app.use("/login", loginRouter);
app.use("/", postRouter);



useErrorHandlers(app);

module.exports = app;
