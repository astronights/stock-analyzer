import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8080";
const PERIOD = parseInt(process.env.PERIOD || "60");

export { HOST, PORT, PERIOD };