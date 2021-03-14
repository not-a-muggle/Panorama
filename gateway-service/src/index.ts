import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
// var cors = require('cors');
import bodyParser from "body-parser";


const loginRouter = require("./routes/login");

const app = express();


app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(cors({ origin: '*' , credentials : true, methods: 'GET,PUT,POST,OPTIONS' }));

app.use('/', loginRouter)

app.use(morgan("combined"));

const port = 3000;
app.listen(port, () => {
    console.log("listening on port 3000");
})