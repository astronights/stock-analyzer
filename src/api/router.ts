import { Router } from "express";

import { AssetController } from "./assetController";
import { LogController } from "./logController";

const router = Router();

const assets = new AssetController();
const logs = new LogController();

router.use("/assets", assets.router);
router.use("/logs", logs.router);

router.get("/", (req, res) => {
  res.status(200).json("Connected!");
});

export default router;