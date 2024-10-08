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
        this.router.get(this.path + 'rm/:stock/:date', this.rmFile.bind(this));
    }

    public async listPrices(req: Request, res: Response): Promise<Response> {
        try {
            const assetString = await readFile(this.assetFile, 'utf8');
            const assets = assetString.split(',');

            const assetFiles: Record<string, string[]> = {};

            const filePromises = assets.map(async (asset) => {
                const assetPath = path.join(this.priceDir, asset.trim());
                const files = await readdir(assetPath);
                assetFiles[asset] = files;
            });

            await Promise.all(filePromises);

            return res.status(200).json(assetFiles);
        } catch (err) {
            return res.status(500).json({ error: 'Unable to read assets' });
        }
    }

    public async getFileCsv(req: Request, res: Response): Promise<Response> {
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

    public async getFile(req: Request, res: Response): Promise<Response> {
        try {
            const { stock, date } = req.params;
            const fpath = path.resolve(path.join(this.priceDir, stock, `${date}.parquet`))
            console.log(fpath);
            res.setHeader('Content-Disposition', `attachment; filename="${date}.parquet"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            return res.status(200).sendFile(fpath);
        } catch (err) {
            console.error('Error sending file:', err);
            return res.status(500).json({ error: 'Unable to read file' });
        }
    }

    public async rmFile(req: Request, res: Response): Promise<Response> {
        try {
            const { stock, date } = req.params;
            await fs.rmSync(path.join(this.priceDir, stock, `${date}.parquet`));
            return res.status(200).json({ message: 'Deleted' });
        } catch (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Unable to read file' });
        }
    }
}