import { ParquetSchema, ParquetWriter } from 'parquetjs';
import { Quote } from "yahoo-finance2/dist/esm/src/modules/quote";
import path from 'path';

const priceDir = './prices';

const tickSchema = new ParquetSchema({
    symbol: { type: 'UTF8' },
    low: { type: 'DOUBLE' }
})

export const writeQuote = (file: File, quote) => {

    const symbol = quote.symbol;
    const dt = quote.regularMarketTime?.toUTCString().split('T')[0].split('-').join('_');

    ParquetWriter.openFile(tickSchema, path.join(priceDir, symbol, `${dt}.parquet`))
        .then(async (writer) => {
            await writer.appendRow({
                symbol: quote.symbol,
                low: quote.low
            });
            writer.close();

        });

}
