import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: '*', credentials: true, methods: 'GET,PUT,POST,OPTIONS' }));

const port = 30900;

app.listen(port, () => {
    console.log(`listening on port ${[port]}`);
});