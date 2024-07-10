import express from "express";
import cors from "cors";
import * as CONFIG from "../src/config";
import { startUp, daily, dailyEx, quote, quoteEx } from "../src/scraper/script";
import cron from 'node-cron';
import bodyParser from 'body-parser';
import router from "../src/api/router";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use("/", router);

const HOST = CONFIG.HOST;
const PORT = parseInt(CONFIG.PORT);

const assets = startUp();
export const quoteArgs = quote.bind(null, assets);

cron.schedule(dailyEx, daily, {
    timezone: 'Etc/UTC'
});

cron.schedule(quoteEx, quoteArgs, {
    timezone: 'Etc/UTC'
});

app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})

module.exports = app;