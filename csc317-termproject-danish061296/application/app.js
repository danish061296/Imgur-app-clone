var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var handlebars = require("express-handlebars");
var sessions = require("express-session");
var mysqlSession = require("express-mysql-session")(sessions);
var flash = require("express-flash");
// var expressValidator = require("express-validator");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var dbRouter = require("./routes/dbtest");
const { checkServerIdentity } = require("tls");
var errorPrint = require("./helpers/debug/debugprinters").errorPrint;
var requestPrint = require("./helpers/debug/debugprinters").requestPrint;

var app = express();
app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    extname: "hbs",
    defaultLayout: "home",
    helpers: {
      emptyObject: (obj) => {
        return !(obj.constructor === Object && Object.keys(obj).length == 0);
      },
      /**
       * if i need helpers i can register
       * them here
       */
    },
  })
);

var mysqlSessionStore = new mysqlSession(
  {
    /* Using default options */
  },
  require("./conf/database")
);

app.use(
  sessions({
    key: "csid",
    secret: "This is a secret from csc317",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  requestPrint(req.url);
  next();
});
app.use((req, res, next) => {
  console.log(req.session);
  if (req.session.username) {
    res.locals.logged = true;
  }
  next();
});

app.use("/", indexRouter);
app.use("/dbtest", dbRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { error_message: err });
  // res.status(500);
  // res.send("something wrong with your db ");
});

module.exports = app;
