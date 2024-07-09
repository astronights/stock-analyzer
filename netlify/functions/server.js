"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteArgs = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CONFIG = __importStar(require("../../src/config"));
const script_1 = require("../../src/scraper/script");
const node_cron_1 = __importDefault(require("node-cron"));
const router_1 = __importDefault(require("../../src/api/router"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/", router_1.default);
const HOST = CONFIG.HOST;
const PORT = parseInt(CONFIG.PORT);
const assets = (0, script_1.startUp)();
exports.quoteArgs = script_1.quote.bind(null, assets);
node_cron_1.default.schedule(script_1.dailyEx, script_1.daily, {
    timezone: 'Etc/UTC'
});
node_cron_1.default.schedule(script_1.quoteEx, exports.quoteArgs, {
    timezone: 'Etc/UTC'
});
app.listen(PORT, () => {
    console.log(`Started server at ${HOST}:${PORT}`);
});
module.exports.handler = (0, serverless_http_1.default)(app);
