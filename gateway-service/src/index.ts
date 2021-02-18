import express from "express";
import morgan from "morgan";
import helmet from "helmet";


const loginRouter = require("./routes/login");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

app.use('/', loginRouter)

app.use(morgan("combined"));

const port = 3000;
app.listen(port, () => {
    console.log("listening on port 3000");
})