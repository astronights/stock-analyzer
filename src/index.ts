import express from "express";
import cors from "cors";
import * as CONFIG from "./config";
import { startUp, daily, dailyEx, quote, quoteEx } from "./scraper/script";
import cron from 'node-cron';
import bodyParser from 'body-parser';
import router from "./api/router";
import { createServer } from "http";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use("/", router);

const HOST = CONFIG.HOST;
const PORT = parseInt(CONFIG.PORT);

const assets = startUp();
export const quoteArgs = quote.bind(null, assets);

cron.schedule(dailyEx, daily, {
    timezone: 'America/New_York'
});

cron.schedule(quoteEx, quoteArgs, {
    timezone: 'America/New_York'
});

const httpServer = createServer(app).listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})
