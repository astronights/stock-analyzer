import express from "express";
import cors from "cors";
import * as CONFIG from "./config";
import { startUp, daily, dailyEx, quote, quoteEx } from "./scraper/script";
import cron from 'node-cron';
import router from "./api/router";
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
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
  console.log(`Started server at ${HOST}:${PORT}`);
});

module.exports.handler = serverless(app);