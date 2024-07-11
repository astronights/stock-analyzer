import { ParquetWriter } from 'parquetjs';
import csv from 'csv-parser';
import * as fs from 'fs';
import path from 'path';

import { Tick, tickSchema } from '../types';

const priceDir = './prices';

export const writeQuote = (tick: Tick) => {

    const symbol = tick.symbol;
    const dt = new Date().toISOString().split('T')[0].split('-').join('_');
    const csvFile = path.join(priceDir, symbol, `${dt}.csv`)

    if (!fs.existsSync(csvFile)) {
        fs.writeFileSync(csvFile, Object.keys(tick).join(',') + '\n');
    }

    fs.appendFileSync(csvFile, Object.values(tick).join(',') + '\n');
}

export const writeCsvsToParquet = async (assets: string[]) => {
    for (const asset of assets) {
        const apDir = path.join(priceDir, asset);

        try {
            const apFiles = fs.readdirSync(apDir);
            for (const apFile of apFiles.filter((file) => file.endsWith('.csv'))) {
                const csvData = await readCsv(path.join(apDir, apFile));
                await writeParquet(csvData, path.join(apDir, apFile.replace('.csv', '.parquet')));
                await fs.promises.rm(path.join(apDir, apFile));
            }
        } catch (err) {
            console.error(`Unable to read ${asset} price files:`, err);
        }
    }
}

const readCsv = (filePath: string) => {
    return new Promise((resolve, reject) => {
        const csvData: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => csvData.push(row))
            .on('end', () => {
                resolve(csvData);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

const writeParquet = async (data, filePath: string) => {
    const writer = await ParquetWriter.openFile(tickSchema, filePath);
    for (const row of data) {
        const cleanedRow = {};
        for (const [key, value] of Object.entries(row)) {
            if(value !== '') {
                cleanedRow[key] = value;
            } 
        }
        await writer.appendRow(cleanedRow);
    }
    await writer.close();
}