import * as fs from 'fs';
import * as path from 'path';
import { Request, Response, Router } from 'express';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

export class PriceController {
    path = '/';
    router = Router();

    priceDir: string;
    assetFile: string;

    constructor() {
        this.priceDir = './prices';
        this.assetFile = './src/data/assets.txt';
        this.router.get(this.path + 'all', this.listPrices.bind(this));
        this.router.get(this.path + 'file/:stock/:date', this.getFile.bind(this));
    }

    public async listPrices(req: Request, res: Response): Promise<Response> {
        try {
            const assetString = await readFile(this.assetFile, 'utf8');
            const assets = assetString.split(',');

            const assetFiles: Record<string, string[]> = {};

            const filePromises = assets.map(async (asset) => {
                const assetPath = path.join(this.priceDir, asset.trim());
                const files = await readdir(assetPath);
                const csvFiles = files.filter((fname) => fname.endsWith('.csv')).map((fname) => fname.slice(0, -4));
                assetFiles[asset] = csvFiles;
            });

            await Promise.all(filePromises);

            return res.status(200).json(assetFiles);
        } catch (err) {
            return res.status(500).json({ error: 'Unable to read assets' });
        }
    }

    public async getFile(req: Request, res: Response): Promise<Response> {
        try {
            const { stock, date } = req.params;
            const filePath = path.join(this.priceDir, stock, `${date}.csv`);
            const fileContent = await readFile(filePath, 'utf8');
            return res.status(200).send(fileContent);
        } catch (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Unable to read file' });
        }
    }
}