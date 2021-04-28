import express from "express";
import cors from "cors";

const app = express();
const shareRouter = require("./routes/share");

app.use(cors({ origin: '*', credentials: true, methods: 'GET,PUT,POST,OPTIONS' }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', shareRouter);

const port = 30900;
app.listen(port, () => {
    console.log(`listening on port ${[port]}`);
});
