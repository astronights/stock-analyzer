import { Router } from "express";

import { AssetController } from "./assetController";

const router = Router();

const assets = new AssetController();

router.use("/assets", assets.router);
router.get("/", (req, res) => {
  res.status(200).json("Connected!");
});

export default router;