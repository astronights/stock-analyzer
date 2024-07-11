import { Router } from "express";

import { AssetController } from "./assetController";
import { LogController } from "./logController";
import { PriceController } from "./priceController";

const router = Router();

const assets = new AssetController();
const logs = new LogController();
const prices = new PriceController();

router.use("/assets", assets.router);
router.use("/logs", logs.router);
router.use("/prices", prices.router);

router.get("/", (req, res) => {
  res.status(200).json("Connected!");
});

export default router;