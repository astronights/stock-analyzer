import { h5wasm } from 'h5wasm';
import { QuoteEquity } from "yahoo-finance2/dist/esm/src/modules/quote";
import path from 'path';

const priceDir = './prices';

export const writeQuotes = (quotes: QuoteEquity) => {
    const dt = new Date();
    const fname = `${dt.getUTCFullYear()}_${(dt.getUTCMonth() + 1).toString().padStart(2, '0')}.h5`;
    const f = new h5wasm.File(path.join(priceDir, fname, "a"));

}