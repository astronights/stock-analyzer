import * as fs from 'fs';
import { Request, Response, Router } from 'express';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);

export class AssetController {
    path = '/';
    router = Router();

    assetFile: string;

    constructor() {
        this.assetFile = './api/data/assets.txt';
        this.router.get(this.path, this.getAssets.bind(this));
        this.router.post(this.path, this.addAsset.bind(this));
    }

    public async getAssets(req: Request, res: Response): Promise<Response> {
        try {
            const data = await readFile(this.assetFile, 'utf8');
            const assets = data.split(',');
            return res.status(200).json({ assets });
        } catch (err) {
            console.error('Error reading assets:', err);
            return res.status(500).json({ error: 'Unable to read assets' });
        }
    }

    public async addAsset(req: Request, res: Response): Promise<Response> {
        const asset = req.query.asset as string;
        if (!asset) {
            return res.status(400).json({ error: 'Asset is required' });
        }

        try {
            await appendFile(this.assetFile, `,${asset}`, 'utf8');
            return res.status(200).json({ asset });
        } catch (err) {
            console.error(`Unable to add asset: ${asset}`, err);
            return res.status(500).json({ error: 'Unable to add asset' });
        }
    }
}